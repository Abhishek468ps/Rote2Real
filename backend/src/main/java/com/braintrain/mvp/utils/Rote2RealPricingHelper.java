package com.braintrain.mvp.utils;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Locale;

@Component
public class Rote2RealPricingHelper {

    public static class PricingInfo {
        private final boolean international;
        private final String currency;
        private final long amountMinor;

        public PricingInfo(boolean international, String currency, long amountMinor) {
            this.international = international;
            this.currency = currency;
            this.amountMinor = amountMinor;
        }

        public boolean isInternational() {
            return international;
        }

        public String getCurrency() {
            return currency;
        }

        public long getAmountMinor() {
            return amountMinor;
        }
    }

    /**
     * Determines pricing details based on student country.
     * Rule:
     * - India: INR 1.00 (100 paise).
     * - International: INR 10.00 equivalent in local currency (e.g. 10 INR = 1000 paise in INR,
     *   or approximate converted minor units in local currency).
     *   Strict requirement: "India: ₹1; international: ₹10 INR equivalent in local currency. Never $1/₹99."
     */
    public PricingInfo resolvePricing(String country) {
        if (country == null || country.trim().isEmpty()) {
            // Default to India
            return new PricingInfo(false, "INR", 100L);
        }

        String normalized = country.trim().toUpperCase(Locale.ROOT);
        if ("INDIA".equals(normalized) || "IN".equals(normalized) || "IND".equals(normalized)) {
            // ₹1 = 100 paise
            return new PricingInfo(false, "INR", 100L);
        }

        // International pricing: ₹10 INR equivalent.
        // For Razorpay international transactions, standard support is USD/EUR/GBP/AED/etc. or INR charging.
        // If USD: ₹10 INR @ ~85 INR/USD ≈ $0.12 USD = 12 cents.
        // If EUR: ₹10 INR @ ~92 INR/EUR ≈ €0.11 EUR = 11 cents.
        // If GBP: ₹10 INR @ ~108 INR/GBP ≈ £0.09 GBP = 9 pence.
        // If AED: ₹10 INR @ ~23 INR/AED ≈ 0.43 AED = 43 fils.
        // If other: INR 10.00 (1000 paise).
        String currency;
        long amountMinor;

        switch (normalized) {
            case "UNITED STATES":
            case "USA":
            case "US":
                currency = "USD";
                amountMinor = 12L; // $0.12 USD (~ ₹10 INR)
                break;
            case "UNITED KINGDOM":
            case "UK":
            case "GB":
            case "GREAT BRITAIN":
                currency = "GBP";
                amountMinor = 9L; // £0.09 GBP (~ ₹10 INR)
                break;
            case "GERMANY":
            case "FRANCE":
            case "ITALY":
            case "SPAIN":
            case "NETHERLANDS":
            case "EUROPE":
                currency = "EUR";
                amountMinor = 11L; // €0.11 EUR (~ ₹10 INR)
                break;
            case "UNITED ARAB EMIRATES":
            case "UAE":
            case "DUBAI":
                currency = "AED";
                amountMinor = 43L; // 0.43 AED (~ ₹10 INR)
                break;
            case "SINGAPORE":
            case "SG":
                currency = "SGD";
                amountMinor = 16L; // 0.16 SGD (~ ₹10 INR)
                break;
            case "CANADA":
            case "CA":
                currency = "CAD";
                amountMinor = 16L; // 0.16 CAD (~ ₹10 INR)
                break;
            case "AUSTRALIA":
            case "AU":
                currency = "AUD";
                amountMinor = 18L; // 0.18 AUD (~ ₹10 INR)
                break;
            default:
                // Default international: ₹10 INR in INR minor units (1000 paise)
                currency = "INR";
                amountMinor = 1000L;
                break;
        }

        return new PricingInfo(true, currency, amountMinor);
    }
}
