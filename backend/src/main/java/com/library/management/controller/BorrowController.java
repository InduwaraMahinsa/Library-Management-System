package com.library.management.controller;

import com.library.management.model.BorrowRecord;
import com.library.management.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @GetMapping
    public ResponseEntity<List<BorrowRecord>> getAllBorrowRecords() {
        List<BorrowRecord> borrowRecords = borrowService.getAllBorrowRecords();
        return new ResponseEntity<>(borrowRecords, HttpStatus.OK);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<BorrowRecord>> getStudentBorrowedBooks(@PathVariable Long studentId) {
        try {
            List<BorrowRecord> borrowRecords = borrowService.getStudentBorrowedBooks(studentId);
            return new ResponseEntity<>(borrowRecords, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/borrow")
    public ResponseEntity<BorrowRecord> borrowBook(
            @RequestParam Long bookId,
            @RequestParam Long studentId) {
        try {
            BorrowRecord borrowRecord = borrowService.borrowBook(bookId, studentId);
            return new ResponseEntity<>(borrowRecord, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/return/{borrowId}")
    public ResponseEntity<BorrowRecord> returnBook(@PathVariable Long borrowId) {
        try {
            BorrowRecord borrowRecord = borrowService.returnBook(borrowId);
            return new ResponseEntity<>(borrowRecord, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}