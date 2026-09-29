package com.braintrain.mvp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "rote2real_students")
@Getter
@Setter
@NoArgsConstructor
public class Rote2RealStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false, length = 80)
    private String country;

    @Column(name = "is_international", nullable = false)
    private Boolean isInternational = false;

    @Column(name = "payment_amount_minor", nullable = false)
    private Long paymentAmountMinor;

    @Column(name = "payment_currency", nullable = false, length = 10)
    private String paymentCurrency;

    @Column(name = "razorpay_order_id", length = 100)
    private String razorpayOrderId;

    @Column(name = "razorpay_payment_id", length = 100)
    private String razorpayPaymentId;

    @Column(name = "payment_status", nullable = false, length = 20)
    private String paymentStatus = "PENDING";

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @PrePersist
    public void prePersist() {
        if (this.registeredAt == null) {
            this.registeredAt = LocalDateTime.now();
        }
        if (this.isInternational == null) {
            this.isInternational = false;
        }
        if (this.paymentStatus == null) {
            this.paymentStatus = "PENDING";
        }
    }
}
