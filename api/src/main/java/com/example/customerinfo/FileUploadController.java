package com.example.customerinfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@RestController
@RequestMapping("/api/customers/{customerId}/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @Value("${aws.s3.bucket-name}")
    private String bucketName;
    
    @Autowired
    private S3Client s3Client;
    
    @PostMapping
    public ResponseEntity<Document> uploadFile(@PathVariable Long customerId, 
                                             @RequestParam("file") MultipartFile file) {
        try {
            String fileName = "customer-" + customerId + "/" + System.currentTimeMillis() + "-" + file.getOriginalFilename();
            
            // Upload to S3
            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();
            
            s3Client.putObject(putRequest, RequestBody.fromBytes(file.getBytes()));
            
            // Save metadata to database
            Document document = new Document();
            document.setCustomerId(customerId);
            document.setFileName(file.getOriginalFilename());
            document.setS3Key(fileName);
            document.setFileSize(file.getSize());
            document.setContentType(file.getContentType());
            
            Document savedDocument = documentRepository.save(document);
            
            return ResponseEntity.ok(savedDocument);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}