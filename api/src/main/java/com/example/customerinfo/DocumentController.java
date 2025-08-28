package com.example.customerinfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers/{customerId}/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @GetMapping
    public List<Document> getCustomerDocuments(@PathVariable Long customerId) {
        return documentRepository.findByCustomerId(customerId);
    }
    
    @PostMapping
    public Document saveDocumentMetadata(@PathVariable Long customerId, @RequestBody Document document) {
        document.setCustomerId(customerId);
        return documentRepository.save(document);
    }
    
    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long customerId, @PathVariable Long documentId) {
        return documentRepository.findById(documentId)
                .filter(doc -> doc.getCustomerId().equals(customerId))
                .map(doc -> {
                    documentRepository.delete(doc);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}