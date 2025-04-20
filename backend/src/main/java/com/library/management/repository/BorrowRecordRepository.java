package com.library.management.repository;

import com.library.management.model.Book;
import com.library.management.model.BorrowRecord;
import com.library.management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    List<BorrowRecord> findByStudentAndIsReturnedFalse(Student student);
    List<BorrowRecord> findByBookAndIsReturnedFalse(Book book);
}