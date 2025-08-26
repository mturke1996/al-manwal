import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Plane,
  User,
  Phone,
  DollarSign,
  FileText,
  Download,
  MapPin,
  Mail,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TravelerForm from "./Enhanced/TravelerForm";

interface Traveler {
  id: string;
  name: string;
  age: string;
  luggageWeight: string;
  seatClass: string;
}

interface InvoiceData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  departureDate: string;
  returnDate: string;
  departureAirport: string;
  arrivalAirport: string;
  flightNumber: string;
  airline: string;
  price: string;
  notes: string;
  invoiceNumber: string;
  invoiceType: "invoice" | "receipt";
  // Receipt specific fields
  amountReceived: string;
  remainingAmount: string;
  receiptMessage: string;
  // Travelers
  travelers: Traveler[];
}

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InvoiceData>({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    departureDate: "",
    returnDate: "",
    departureAirport: "",
    arrivalAirport: "",
    flightNumber: "",
    airline: "",
    price: "",
    notes: "",
    invoiceNumber: `INV-${Date.now()}`,
    invoiceType: "invoice",
    amountReceived: "",
    remainingAmount: "",
    receiptMessage: "",
    travelers: [
      {
        id: "1",
        name: "",
        age: "",
        luggageWeight: "",
        seatClass: "economy",
      },
    ],
  });

  const handleInputChange = (field: keyof InvoiceData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const travelTips = [
    "الوصول للمطار قبل الإقلاع بساعتين",
    "احتفظ بنسخة من التذكرة وجواز السفر",
    "الوزن المسموح قد يختلف حسب شركة الطيران",
    "للدعم والطوارئ تواصل معنا على الرقم أدناه",
    "تأكد من صحة جواز السفر قبل السفر",
    "احتفظ برقم رحلة الطيران معك",
  ];

  const generateInvoice = () => {
    if (!formData.customerName || !formData.customerPhone || !formData.price) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إنشاء الفاتورة بنجاح",
      description: "يمكنك الآن طباعة أو تحميل الفاتورة",
    });
  };

  const formatDateCustom = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getSeatClassArabic = (seatClass: string) => {
    const classes = {
      economy: "الاقتصادية",
      business: "رجال الأعمال",
      first: "الدرجة الأولى",
    };
    return classes[seatClass as keyof typeof classes] || "الاقتصادية";
  };

  const downloadPDF = () => {
    if (!formData.customerName || !formData.price) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء البيانات المطلوبة قبل التحميل",
        variant: "destructive",
      });
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const travelersInfo = formData.travelers
      .map(
        (traveler, index) => `
      <tr>
        <td style="padding: 6px 4px; text-align: center; font-weight: 700; background: #f8fafc; color: #2563eb; font-size: 9px;">${
          index + 1
        }</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 600; color: #1f2937; font-size: 8px;">${
          traveler.name || "غير محدد"
        }</td>
        <td style="padding: 6px 4px; text-align: center; color: #374151; font-size: 8px;">${
          traveler.age || "-"
        }</td>
        <td style="padding: 6px 4px; text-align: center; color: #374151; font-size: 8px;">${
          traveler.luggageWeight || "-"
        }</td>
        <td style="padding: 6px 4px; text-align: center; color: #374151; font-size: 8px;">${getSeatClassArabic(
          traveler.seatClass
        )}</td>
      </tr>
    `
      )
      .join("");

    const travelTipsHTML = travelTips
      .map(
        (tip, index) => `
      <div style="display: flex; align-items: flex-start; gap: 4px; margin-bottom: 4px; padding: 4px; background: #ffffff; border-radius: 3px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
        <div style="background: #2563eb; color: white; border-radius: 50%; width: 12px; height: 12px; display: flex; align-items: center; justify-content: center; font-size: 6px; font-weight: bold; flex-shrink: 0;">${
          index + 1
        }</div>
        <span style="font-size: 7px; color: #374151; font-weight: 500; line-height: 1.2;">${tip}</span>
      </div>
    `
      )
      .join("");

    const invoiceHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${
          formData.invoiceType === "invoice" ? "فاتورة" : "وصل استلام"
        } - ${formData.invoiceNumber}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          @page { 
            size: A4 portrait; 
            margin: 8mm; 
          }
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          body { 
            font-family: 'Cairo', sans-serif; 
            background: #ffffff; 
            color: #1f2937; 
            font-size: 10px;
            line-height: 1.4;
            letter-spacing: 0.01em;
            direction: rtl;
            text-align: right;
          }
          .invoice-container { 
            max-width: 100%; 
            margin: 0 auto; 
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            position: relative;
            padding: 0;
          }
          
          /* Watermark */
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            color: rgba(59, 130, 246, 0.03);
            font-weight: 900;
            z-index: 0;
            pointer-events: none;
          }
          
          .content-wrapper {
            position: relative;
            z-index: 1;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          /* Header */
          .header-section { 
            background: #ffffff;
            padding: 16px 20px;
            margin: -8mm -8mm 12px -8mm;
            border-bottom: 2px solid #2563eb;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #1f2937;
          }
          .company-section {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .company-logo {
            width: 40px;
            height: 40px;
            background: #2563eb;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
          }
          .company-info h1 {
            font-size: 16px;
            font-weight: 800;
            margin-bottom: 2px;
            color: #1f2937;
          }
          .company-subtitle {
            font-size: 10px;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 3px;
          }
          .company-contact {
            font-size: 8px;
            color: #9ca3af;
            line-height: 1.3;
          }
          .invoice-badge {
            background: #2563eb;
            padding: 8px 16px;
            border-radius: 6px;
            text-align: center;
            color: white;
            box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
          }
          .invoice-title {
            font-size: 16px;
            font-weight: 800;
            margin-bottom: 1px;
          }
          .invoice-subtitle {
            font-size: 8px;
            font-weight: 600;
            opacity: 0.9;
          }
          
          /* Content Cards */
          .content-main {
            flex: 1;
            padding: 0 4px;
          }
          .info-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
          }
          .info-section h3 {
            font-size: 12px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 6px;
            padding-bottom: 4px;
            border-bottom: 1px solid #2563eb;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 9px;
          }
          .info-item:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #374151;
          }
          .info-value {
            font-weight: 700;
            color: #1f2937;
          }
          
          /* Travelers Table */
          .travelers-section {
            margin-bottom: 16px;
          }
          .travelers-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
          }
          .travelers-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          .travelers-table tbody tr:hover {
            background: #f1f5f9;
          }
          .travelers-table thead tr {
            background: #2563eb;
          }
          .travelers-table th {
            color: white;
            padding: 8px 6px;
            font-weight: 700;
            font-size: 9px;
            text-align: center;
          }
          .travelers-table tbody tr {
            border-bottom: 1px solid #f3f4f6;
          }
          .travelers-table tbody tr:hover {
            background: #f9fafb;
          }
          .travelers-table tbody tr:last-child {
            border-bottom: none;
          }
          
          /* Flight Details Grid */
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
            margin-top: 10px;
          }
          .detail-item {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            padding: 8px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            position: relative;
            overflow: hidden;
            transition: all 0.2s ease;
          }
          .detail-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          }
          .detail-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
          }
          .detail-label {
            font-size: 8px;
            color: #374151;
            font-weight: 700;
            margin-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            opacity: 0.8;
          }
          .detail-value {
            font-size: 9px;
            color: #1f2937;
            font-weight: 600;
            line-height: 1.2;
          }
          
          /* Travel Tips */
          .tips-section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          }
          .tips-section h3 {
            color: #1f2937;
            margin-bottom: 8px;
            font-size: 12px;
            font-weight: 700;
            border-bottom: 1px solid #2563eb;
            padding-bottom: 4px;
          }
          
          /* Total Section - Modern Clean Design */
          .total-section {
            margin: 12px 0;
            text-align: center;
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%);
            padding: 12px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
            position: relative;
            overflow: hidden;
          }
          .total-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.4;
          }
          .total-section::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
          }
          @keyframes shimmer {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
            50% { transform: translate(-50%, -50%) rotate(180deg); }
          }
          .total-amount {
            font-size: 21px;
            font-weight: 900;
            color: white;
            margin-bottom: 4px;
            line-height: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            position: relative;
            z-index: 2;
            background: linear-gradient(45deg, #ffffff, #f0f9ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .total-label {
            font-size: 8px;
            font-weight: 700;
            color: rgba(255,255,255,0.95);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 2;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }
          .signature-text {
            font-size: 6px;
            color: rgba(255,255,255,0.9);
            margin-top: 6px;
            font-weight: 600;
            position: relative;
            z-index: 2;
            text-shadow: 0 1px 1px rgba(0,0,0,0.1);
          }
          
          /* Signatures - Removed */
          
          /* Footer */
          .footer-section {
            background: #f8fafc;
            padding: 12px;
            margin: 12px -8mm -8mm -8mm;
            text-align: center;
            border-top: 2px solid #2563eb;
          }
          .footer-title {
            font-size: 12px;
            color: #1f2937;
            font-weight: 800;
            margin-bottom: 6px;
          }
          .footer-info {
            font-size: 8px;
            color: #6b7280;
            line-height: 1.4;
            font-weight: 500;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 0;
              font-size: 9px;
            }
            .invoice-container { 
              box-shadow: none; 
              margin: 0;
              padding: 0;
            }
            .watermark { display: none; }
            .header-section {
              margin: 0 0 8px 0;
              padding: 12px 16px;
            }
            .info-card {
              margin-bottom: 8px;
              padding: 8px;
            }
            .total-section {
              margin: 8px 0;
              padding: 8px;
            }
            .footer-section {
              margin: 8px 0 0 0;
              padding: 8px;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="watermark">${
            formData.invoiceType === "invoice" ? "فاتورة" : "وصل"
          }</div>
          
          <div class="content-wrapper">
            <!-- Header -->
            <div class="header-section">
              <div class="header-content">
                <div class="company-section">
                                  <div class="company-logo">
                  <div class="logo-circle">
                    <span class="logo-text">المنوال</span>
                  </div>
                </div>
                  <div class="company-info">
                    <h1>شركة المنوال للسفر والسياحة</h1>
                    <div class="company-subtitle">Al Manwal Travel & Tourism</div>
                    <div class="company-contact">
                      📍 تاجوراء، طرابلس، ليبيا<br/>
                      📞 0913031006 •
                      ✉️ info@almanwal-travel.ly
                    </div>
                  </div>
                </div>
                
                <div class="invoice-badge">
                  <div class="invoice-title">${
                    formData.invoiceType === "invoice" ? "فاتورة" : "وصل استلام"
                  }</div>
                  <div class="invoice-subtitle">${
                    formData.invoiceType === "invoice" ? "INVOICE" : "RECEIPT"
                  }</div>
                </div>
              </div>
            </div>

            <div class="content-main">
              <!-- Customer and Invoice Info -->
              <div class="info-grid">
                <div class="info-card">
                  <h3>👤 بيانات العميل</h3>
                  <div class="info-item">
                    <span class="info-label">📝 الاسم:</span>
                    <span class="info-value">${formData.customerName}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">📞 الهاتف:</span>
                    <span class="info-value">${formData.customerPhone}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">📍 العنوان:</span>
                    <span class="info-value">${
                      formData.customerAddress || "غير محدد"
                    }</span>
                  </div>
                </div>
                
                <div class="info-card">
                  <h3>📋 معلومات ${
                    formData.invoiceType === "invoice" ? "الفاتورة" : "الوصل"
                  }</h3>
                  <div class="info-item">
                    <span class="info-label">🔢 رقم ${
                      formData.invoiceType === "invoice" ? "الفاتورة" : "الوصل"
                    }:</span>
                    <span class="info-value">${formData.invoiceNumber}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">📅 التاريخ:</span>
                    <span class="info-value">${formatDateCustom(
                      new Date()
                    )}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">👨‍💼 المسؤول:</span>
                    <span class="info-value">أيوب التركي</span>
                  </div>
                </div>
              </div>

              <!-- Travelers Section -->
              <div class="info-card travelers-section">
                <h3>👥 بيانات المسافرين</h3>
                <table class="travelers-table">
                  <thead>
                    <tr>
                      <th style="width: 10%;">🔢 م</th>
                      <th style="width: 35%;">👤 اسم المسافر</th>
                      <th style="width: 15%;">🎂 العمر</th>
                      <th style="width: 20%;">💼 وزن الحقائب</th>
                      <th style="width: 20%;">✈️ درجة السفر</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${travelersInfo}
                  </tbody>
                </table>
              </div>

              ${
                formData.invoiceType === "invoice"
                  ? `
              <!-- Flight Details -->
              <div class="info-card">
                <h3>✈️ تفاصيل الرحلة</h3>
                <div class="details-grid">
                  <div class="detail-item" style="background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); border-left: 3px solid #10b981; box-shadow: 0 1px 3px rgba(16, 185, 129, 0.1);">
                    <div class="detail-label" style="color: #059669; font-weight: 800;">📅 تاريخ المغادرة</div>
                    <div class="detail-value" style="color: #047857; font-weight: 700;">${
                      formData.departureDate || "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%); border-left: 3px solid #f59e0b; box-shadow: 0 1px 3px rgba(245, 158, 11, 0.1);">
                    <div class="detail-label" style="color: #d97706; font-weight: 800;">📅 تاريخ العودة</div>
                    <div class="detail-value" style="color: #b45309; font-weight: 700;">${
                      formData.returnDate || "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="background: linear-gradient(135deg, #faf5ff 0%, #ffffff 100%); border-left: 3px solid #8b5cf6; box-shadow: 0 1px 3px rgba(139, 92, 246, 0.1);">
                    <div class="detail-label" style="color: #7c3aed; font-weight: 800;">✈️ رقم الرحلة</div>
                    <div class="detail-value" style="color: #6d28d9; font-weight: 700;">${
                      formData.flightNumber || "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); border-left: 3px solid #ef4444; box-shadow: 0 1px 3px rgba(239, 68, 68, 0.1);">
                    <div class="detail-label" style="color: #dc2626; font-weight: 800;">🛫 من</div>
                    <div class="detail-value" style="color: #b91c1c; font-weight: 700;">${
                      formData.departureAirport || "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="background: linear-gradient(135deg, #ecfeff 0%, #ffffff 100%); border-left: 3px solid #06b6d4; box-shadow: 0 1px 3px rgba(6, 182, 212, 0.1);">
                    <div class="detail-label" style="color: #0891b2; font-weight: 800;">🛬 إلى</div>
                    <div class="detail-value" style="color: #0e7490; font-weight: 700;">${
                      formData.arrivalAirport || "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="background: linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%); border-left: 3px solid #ec4899; box-shadow: 0 1px 3px rgba(236, 72, 153, 0.1);">
                    <div class="detail-label" style="color: #db2777; font-weight: 800;">🏢 شركة الطيران</div>
                    <div class="detail-value" style="color: #be185d; font-weight: 700;">${
                      formData.airline || "غير محدد"
                    }</div>
                  </div>
                </div>
              </div>
              `
                  : `
              <!-- Receipt Details -->
              <div class="info-card">
                <h3>💰 تفاصيل الاستلام</h3>
                <div class="details-grid" style="grid-template-columns: 1fr 1fr;">
                  <div class="detail-item" style="border-left: 4px solid #2563eb;">
                    <div class="detail-label" style="color: #2563eb;">المبلغ المستلم</div>
                    <div class="detail-value" style="color: #2563eb; font-weight: 800;">${
                      formData.amountReceived
                        ? `${formData.amountReceived} د.ل`
                        : "غير محدد"
                    }</div>
                  </div>
                  <div class="detail-item" style="border-left: 4px solid #374151;">
                    <div class="detail-label" style="color: #374151;">المبلغ المتبقي</div>
                    <div class="detail-value" style="color: #374151; font-weight: 800;">${
                      formData.remainingAmount
                        ? `${formData.remainingAmount} د.ل`
                        : "غير محدد"
                    }</div>
                  </div>
                </div>
                ${
                  formData.receiptMessage
                    ? `
                <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 11px; color: #374151; line-height: 1.5; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                  <strong style="color: #2563eb;">رسالة الاستلام:</strong><br/>
                  ${formData.receiptMessage}
                </div>
                `
                    : ""
                }
              </div>
              `
              }

              <!-- Travel Tips -->
              <div class="tips-section">
                <h3>💡 معلومات مهمة للمسافر</h3>
                <div class="tips-grid">
                  ${travelTipsHTML}
                </div>
              </div>

                              ${
                                formData.notes
                                  ? `
              <div class="info-card">
                <h3>📝 ملاحظات إضافية</h3>
                <div style="font-size: 11px; color: #374151; font-weight: 500; line-height: 1.5; margin-top: 12px; padding: 12px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                  ${formData.notes}
                </div>
              </div>
              `
                                  : ""
                              }

              <!-- Total Section -->
              <div class="total-section">
                <div class="total-amount">${formData.price} د.ل</div>
                <div class="total-label">${
                  formData.invoiceType === "invoice"
                    ? "المجموع الإجمالي"
                    : "إجمالي المبلغ"
                }</div>
                <div class="signature-text">التوقيع: _________________</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer-section">
            <div class="footer-title">شكراً لاختياركم شركة المنوال للسفر والسياحة</div>
            <div class="footer-info">
              العنوان: تاجوراء، طرابلس، ليبيا • الهاتف: 0925-987654<br/>
              البريد الإلكتروني: info@almanwal-travel.ly • الموقع: www.almanwal-travel.ly<br/>
              نحن نقدم أفضل الخدمات في مجال السفر والسياحة مع ضمان الجودة والأمان
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 100);
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    toast({
      title: "جاري تحميل الفاتورة",
      description: "سيتم فتح نافذة الطباعة خلال ثوانٍ",
    });
  };

  return (
    <section id="invoice" className="py-8 sm:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl sm:text-2xl font-cairo text-gray-800 flex items-center gap-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                بيانات{" "}
                {formData.invoiceType === "invoice"
                  ? "الفاتورة"
                  : "وصل الاستلام"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invoice Type */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => handleInputChange("invoiceType", "invoice")}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-cairo font-medium transition-all text-sm sm:text-base ${
                    formData.invoiceType === "invoice"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  فاتورة
                </button>
                <button
                  onClick={() => handleInputChange("invoiceType", "receipt")}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-cairo font-medium transition-all text-sm sm:text-base ${
                    formData.invoiceType === "receipt"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  وصل استلام
                </button>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-cairo font-bold text-gray-800 text-base sm:text-lg border-b-2 border-blue-100 pb-2">
                  بيانات العميل
                </h3>

                <div>
                  <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                    <User size={16} className="text-blue-600" />
                    اسم العميل *
                  </Label>
                  <Input
                    value={formData.customerName}
                    onChange={(e) =>
                      handleInputChange("customerName", e.target.value)
                    }
                    placeholder="أدخل اسم العميل"
                    className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                      <Phone size={16} className="text-blue-600" />
                      رقم الهاتف *
                    </Label>
                    <Input
                      value={formData.customerPhone}
                      onChange={(e) =>
                        handleInputChange("customerPhone", e.target.value)
                      }
                      placeholder="أدخل رقم الهاتف"
                      className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                      <MapPin size={16} className="text-blue-600" />
                      العنوان
                    </Label>
                    <Input
                      value={formData.customerAddress}
                      onChange={(e) =>
                        handleInputChange("customerAddress", e.target.value)
                      }
                      placeholder="أدخل العنوان"
                      className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <TravelerForm
                travelers={formData.travelers}
                onTravelersChange={(travelers) =>
                  setFormData((prev) => ({ ...prev, travelers }))
                }
              />

              {/* Flight Details - Only show for invoices */}
              {formData.invoiceType === "invoice" && (
                <div className="space-y-4">
                  <h3 className="font-cairo font-bold text-gray-800 text-base sm:text-lg border-b-2 border-blue-100 pb-2">
                    تفاصيل الرحلة
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <CalendarDays size={16} className="text-blue-600" />
                        تاريخ المغادرة
                      </Label>
                      <Input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) =>
                          handleInputChange("departureDate", e.target.value)
                        }
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <CalendarDays size={16} className="text-blue-600" />
                        تاريخ العودة
                      </Label>
                      <Input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) =>
                          handleInputChange("returnDate", e.target.value)
                        }
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <Plane size={16} className="text-blue-600" />
                        مطار المغادرة
                      </Label>
                      <Input
                        value={formData.departureAirport}
                        onChange={(e) =>
                          handleInputChange("departureAirport", e.target.value)
                        }
                        placeholder="مثل: مطار طرابلس الدولي"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <Plane size={16} className="text-blue-600" />
                        مطار الوصول
                      </Label>
                      <Input
                        value={formData.arrivalAirport}
                        onChange={(e) =>
                          handleInputChange("arrivalAirport", e.target.value)
                        }
                        placeholder="مثل: مطار دبي الدولي"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <Plane size={16} className="text-blue-600" />
                        رقم الرحلة
                      </Label>
                      <Input
                        value={formData.flightNumber}
                        onChange={(e) =>
                          handleInputChange("flightNumber", e.target.value)
                        }
                        placeholder="مثل: EK123"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <Plane size={16} className="text-blue-600" />
                        شركة الطيران
                      </Label>
                      <Input
                        value={formData.airline}
                        onChange={(e) =>
                          handleInputChange("airline", e.target.value)
                        }
                        placeholder="مثل: طيران الإمارات"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt specific fields */}
              {formData.invoiceType === "receipt" && (
                <div className="space-y-4">
                  <h3 className="font-cairo font-bold text-gray-800 text-base sm:text-lg border-b-2 border-green-100 pb-2">
                    تفاصيل الاستلام
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <DollarSign size={16} className="text-green-600" />
                        المبلغ المستلم *
                      </Label>
                      <Input
                        value={formData.amountReceived}
                        onChange={(e) =>
                          handleInputChange("amountReceived", e.target.value)
                        }
                        placeholder="أدخل المبلغ المستلم"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-green-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                        <DollarSign size={16} className="text-orange-600" />
                        المبلغ المتبقي
                      </Label>
                      <Input
                        value={formData.remainingAmount}
                        onChange={(e) =>
                          handleInputChange("remainingAmount", e.target.value)
                        }
                        placeholder="أدخل المبلغ المتبقي"
                        className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-cairo font-medium mb-3 block text-sm">
                      رسالة الاستلام
                    </Label>
                    <Textarea
                      value={formData.receiptMessage}
                      onChange={(e) =>
                        handleInputChange("receiptMessage", e.target.value)
                      }
                      placeholder="مثال: تم استلام مبلغ قدره ... دينار ليبي من السيد/ة ... كدفعة أولى لحجز تذكرة سفر..."
                      rows={4}
                      className="font-cairo resize-none border-2 border-gray-200 rounded-xl focus:border-green-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Price and Notes */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3 text-sm">
                    <DollarSign size={16} className="text-blue-600" />
                    {formData.invoiceType === "invoice"
                      ? "السعر الإجمالي بالدينار الليبي *"
                      : "إجمالي المبلغ بالدينار الليبي *"}
                  </Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="أدخل المبلغ"
                    className="font-cairo h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-cairo font-medium mb-3 block text-sm">
                    ملاحظات إضافية
                  </Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أضف أي ملاحظات مهمة..."
                    rows={3}
                    className="font-cairo resize-none border-2 border-gray-200 rounded-xl focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={generateInvoice}
                className={`w-full text-white font-cairo hover:shadow-lg h-12 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg ${
                  formData.invoiceType === "invoice"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
              >
                <FileText className="ml-2" size={20} />
                إنشاء{" "}
                {formData.invoiceType === "invoice"
                  ? "الفاتورة"
                  : "وصل الاستلام"}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl sm:text-2xl font-cairo text-gray-800 flex items-center gap-3">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                معاينة{" "}
                {formData.invoiceType === "invoice"
                  ? "الفاتورة"
                  : "وصل الاستلام"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Header */}
              <div className="flex justify-between items-start mb-6 border-b-2 border-blue-600 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      شركة المنوال
                    </h2>
                    <p className="text-gray-600 font-semibold text-sm">
                      للسفر والسياحة
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md">
                    <h1 className="text-lg font-bold mb-1">
                      {formData.invoiceType === "invoice"
                        ? "فاتورة"
                        : "وصل استلام"}
                    </h1>
                    <p className="text-xs font-medium opacity-90">
                      {formData.invoiceType === "invoice"
                        ? "INVOICE"
                        : "RECEIPT"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    معلومات الشركة
                  </h3>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-blue-600" />
                      <span className="font-medium">0925-987654</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span className="font-medium">
                        info@almanwal-travel.ly
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span className="font-medium">
                        تاجوراء، طرابلس، ليبيا
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="space-y-2 text-xs">
                    <p>
                      <span className="font-bold text-gray-800">
                        رقم الفاتورة:
                      </span>{" "}
                      <span className="text-blue-600 font-semibold">
                        {formData.invoiceNumber}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-800">التاريخ:</span>{" "}
                      <span className="font-medium">
                        {formatDateCustom(new Date())}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 border-b border-blue-600 pb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  بيانات العميل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <p className="font-medium">
                    <span className="font-bold text-gray-800">📝 الاسم:</span>{" "}
                    {formData.customerName || "___________"}
                  </p>
                  <p className="font-medium">
                    <span className="font-bold text-gray-800">📞 الهاتف:</span>{" "}
                    {formData.customerPhone || "___________"}
                  </p>
                  <p className="md:col-span-2 font-medium">
                    <span className="font-bold text-gray-800">📍 العنوان:</span>{" "}
                    {formData.customerAddress || "___________"}
                  </p>
                </div>
              </div>

              {/* Travelers Info */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 border-b border-blue-600 pb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  بيانات المسافرين ({formData.travelers.length})
                </h3>
                <div className="space-y-2">
                  {formData.travelers.map((traveler, index) => (
                    <div
                      key={traveler.id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-sm">
                            👤 {traveler.name || `المسافر ${index + 1}`}
                          </p>
                          <p className="text-xs text-gray-600">
                            🎂 العمر: {traveler.age || "__"} • 💼 الحقائب:{" "}
                            {traveler.luggageWeight || "__"} كيلو • ✈️ الدرجة:{" "}
                            {getSeatClassArabic(traveler.seatClass)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flight Details - Only for invoices */}
              {formData.invoiceType === "invoice" && (
                <div className="mb-6">
                  <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 border-b border-blue-600 pb-2">
                    <Plane className="w-4 h-4 text-blue-600" />
                    تفاصيل الرحلة
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border-l-3 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-green-700 mb-1">
                        📅 تاريخ المغادرة
                      </div>
                      <div className="text-sm font-semibold text-green-800">
                        {formData.departureDate || "___________"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border-l-3 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-orange-700 mb-1">
                        📅 تاريخ العودة
                      </div>
                      <div className="text-sm font-semibold text-orange-800">
                        {formData.returnDate || "___________"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border-l-3 border-red-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-red-700 mb-1">
                        🛫 من
                      </div>
                      <div className="text-sm font-semibold text-red-800">
                        {formData.departureAirport || "___________"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-3 border-l-3 border-cyan-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-cyan-700 mb-1">
                        🛬 إلى
                      </div>
                      <div className="text-sm font-semibold text-cyan-800">
                        {formData.arrivalAirport || "___________"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border-l-3 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-purple-700 mb-1">
                        ✈️ رقم الرحلة
                      </div>
                      <div className="text-sm font-semibold text-purple-800">
                        {formData.flightNumber || "___________"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 border-l-3 border-pink-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-pink-700 mb-1">
                        🏢 شركة الطيران
                      </div>
                      <div className="text-sm font-semibold text-pink-800">
                        {formData.airline || "___________"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt Details - Only for receipts */}
              {formData.invoiceType === "receipt" && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    تفاصيل الاستلام
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 space-y-4 border border-green-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <p className="font-medium">
                        <span className="font-bold text-gray-800">
                          المبلغ المستلم:
                        </span>{" "}
                        <span className="text-green-600 font-bold">
                          {formData.amountReceived
                            ? `${formData.amountReceived} د.ل`
                            : "_____ د.ل"}
                        </span>
                      </p>
                      <p className="font-medium">
                        <span className="font-bold text-gray-800">
                          المبلغ المتبقي:
                        </span>{" "}
                        <span className="text-orange-600 font-bold">
                          {formData.remainingAmount
                            ? `${formData.remainingAmount} د.ل`
                            : "_____ د.ل"}
                        </span>
                      </p>
                    </div>
                    {formData.receiptMessage && (
                      <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">
                          {formData.receiptMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Travel Tips Preview */}
              <div className="bg-white rounded-lg p-3 mb-4 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2 border-b border-blue-600 pb-1">
                  💡 معلومات مهمة للمسافر
                </h3>
                <div className="space-y-1">
                  {travelTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-1 bg-gray-50 rounded-md p-1 border border-gray-200"
                    >
                      <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-xs text-gray-700 font-medium leading-tight">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {formData.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    ملاحظات
                  </h3>
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-gray-700 font-medium">
                      {formData.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Total - Clean Modern Design */}
              <div className="text-center my-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 py-3 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <div className="text-xl font-black mb-2 text-white drop-shadow-lg">
                    {formData.price ? `${formData.price} د.ل` : "_____ د.ل"}
                  </div>
                  <div className="text-xs font-bold text-white/95 uppercase tracking-wider drop-shadow-sm">
                    {formData.invoiceType === "invoice"
                      ? "المجموع الإجمالي"
                      : "إجمالي المبلغ"}
                  </div>
                  <div className="text-xs text-white/90 mt-1 font-semibold drop-shadow-sm">
                    التوقيع: _________________
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 font-medium">
                  شكراً لثقتكم في خدماتنا
                </p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  شركة المنوال للسفر والسياحة • تاجوراء، طرابلس، ليبيا
                  <br />
                  هاتف: 0925-987654 • إيميل: info@almanwal-travel.ly
                </p>
              </div>

              <Button
                onClick={downloadPDF}
                className={`w-full mt-6 text-white font-cairo font-semibold hover:shadow-lg h-12 sm:h-14 text-base sm:text-lg rounded-xl transition-all ${
                  formData.invoiceType === "invoice"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
                disabled={!formData.customerName || !formData.price}
              >
                <Download className="ml-2" size={20} />
                تحميل{" "}
                {formData.invoiceType === "invoice"
                  ? "الفاتورة"
                  : "وصل الاستلام"}{" "}
                PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InvoiceGenerator;
