// prisma/seed.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg as PrismaPg2 } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum UserRole {\n  USER\n  ADMIN\n}\n\nenum BookingType {\n  PICKUP\n  DROPOFF\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  CASH\n  MOBILE_MONEY\n  CARD\n  WHATSAPP\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nmodel User {\n  id            String    @id @default(cuid())\n  name          String?\n  email         String    @unique\n  phone         String?\n  passwordHash  String?\n  role          UserRole  @default(USER)\n  emailVerified DateTime?\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  bookings      Booking[]\n  accounts      Account[]\n  sessions      Session[]\n}\n\nmodel Account {\n  id                String  @id @default(cuid())\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String? @db.Text\n  access_token      String? @db.Text\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String? @db.Text\n  session_state     String?\n  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n}\n\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String   @unique\n  expires    DateTime\n\n  @@unique([identifier, token])\n}\n\nmodel Vehicle {\n  id          String    @id @default(cuid())\n  name        String\n  description String?\n  imageUrl    String?\n  capacity    Int\n  basePrice   Decimal   @db.Decimal(10, 2)\n  pricePerKm  Decimal   @default(0) @db.Decimal(10, 2)\n  isActive    Boolean   @default(true)\n  sortOrder   Int       @default(0)\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n  bookings    Booking[]\n}\n\nmodel Media {\n  id           String     @id @default(cuid())\n  filename     String\n  originalName String\n  mimeType     String\n  size         Int\n  url          String     @unique\n  alt          String?\n  caption      String?\n  folder       String     @default("general")\n  createdAt    DateTime   @default(now())\n  updatedAt    DateTime   @updatedAt\n  blogPosts    BlogPost[]\n}\n\nmodel BlogPost {\n  id              String   @id @default(cuid())\n  slug            String   @unique\n  title           String\n  excerpt         String   @db.Text\n  category        String\n  publishedAt     DateTime\n  readTime        String   @default("5 min read")\n  imageUrl        String?\n  imageAlt        String?\n  imageMediaId    String?\n  imageMedia      Media?   @relation(fields: [imageMediaId], references: [id], onDelete: SetNull)\n  sections        Json\n  contentHtml     String?  @db.Text\n  isPublished     Boolean  @default(true)\n  metaTitle       String?\n  metaDescription String?  @db.Text\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  @@index([isPublished, publishedAt])\n}\n\nenum CorporateEnquiryStatus {\n  NEW\n  CONTACTED\n  IN_PROGRESS\n  CLOSED\n  SPAM\n}\n\nmodel CorporateEnquiry {\n  id          String                 @id @default(cuid())\n  reference   String                 @unique\n  company     String\n  contactName String\n  email       String\n  phone       String\n  serviceType String\n  message     String                 @db.Text\n  status      CorporateEnquiryStatus @default(NEW)\n  adminNotes  String?                @db.Text\n  createdAt   DateTime               @default(now())\n  updatedAt   DateTime               @updatedAt\n\n  @@index([status])\n  @@index([createdAt])\n}\n\nmodel Booking {\n  id                String        @id @default(cuid())\n  reference         String        @unique\n  userId            String?\n  user              User?         @relation(fields: [userId], references: [id], onDelete: SetNull)\n  vehicleId         String\n  vehicle           Vehicle       @relation(fields: [vehicleId], references: [id])\n  type              BookingType\n  status            BookingStatus @default(PENDING)\n  pickupLocation    String\n  dropoffLocation   String\n  pickupDate        DateTime\n  flightNumber      String?\n  passengerCount    Int\n  luggageCount      Int           @default(0)\n  customerName      String\n  customerEmail     String\n  customerPhone     String\n  specialRequests   String?\n  quotedPrice       Decimal       @db.Decimal(10, 2)\n  distanceKm        Decimal?      @db.Decimal(10, 2)\n  paymentMethod     PaymentMethod @default(WHATSAPP)\n  paymentStatus     PaymentStatus @default(PENDING)\n  paystackReference String?\n  adminNotes        String?\n  createdAt         DateTime      @default(now())\n  updatedAt         DateTime      @updatedAt\n\n  @@index([status])\n  @@index([pickupDate])\n  @@index([customerPhone])\n}\n\nmodel CmsPage {\n  id               String   @id @default(cuid())\n  slug             String   @unique\n  title            String\n  excerpt          String?  @db.Text\n  content          String   @db.Text\n  featuredImageUrl String?\n  featuredImageAlt String?\n  metaTitle        String?\n  metaDescription  String?  @db.Text\n  isPublished      Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n}\n\nmodel SiteSetting {\n  id    String @id @default(cuid())\n  key   String @unique\n  value String @db.Text\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"emailVerified","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":null},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"provider","kind":"scalar","type":"String"},{"name":"providerAccountId","kind":"scalar","type":"String"},{"name":"refresh_token","kind":"scalar","type":"String"},{"name":"access_token","kind":"scalar","type":"String"},{"name":"expires_at","kind":"scalar","type":"Int"},{"name":"token_type","kind":"scalar","type":"String"},{"name":"scope","kind":"scalar","type":"String"},{"name":"id_token","kind":"scalar","type":"String"},{"name":"session_state","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionToken","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":null},"VerificationToken":{"fields":[{"name":"identifier","kind":"scalar","type":"String"},{"name":"token","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"}],"dbName":null},"Vehicle":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"basePrice","kind":"scalar","type":"Decimal"},{"name":"pricePerKm","kind":"scalar","type":"Decimal"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToVehicle"}],"dbName":null},"Media":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"filename","kind":"scalar","type":"String"},{"name":"originalName","kind":"scalar","type":"String"},{"name":"mimeType","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"Int"},{"name":"url","kind":"scalar","type":"String"},{"name":"alt","kind":"scalar","type":"String"},{"name":"caption","kind":"scalar","type":"String"},{"name":"folder","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"blogPosts","kind":"object","type":"BlogPost","relationName":"BlogPostToMedia"}],"dbName":null},"BlogPost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"publishedAt","kind":"scalar","type":"DateTime"},{"name":"readTime","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imageAlt","kind":"scalar","type":"String"},{"name":"imageMediaId","kind":"scalar","type":"String"},{"name":"imageMedia","kind":"object","type":"Media","relationName":"BlogPostToMedia"},{"name":"sections","kind":"scalar","type":"Json"},{"name":"contentHtml","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CorporateEnquiry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reference","kind":"scalar","type":"String"},{"name":"company","kind":"scalar","type":"String"},{"name":"contactName","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"serviceType","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"CorporateEnquiryStatus"},{"name":"adminNotes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reference","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"vehicleId","kind":"scalar","type":"String"},{"name":"vehicle","kind":"object","type":"Vehicle","relationName":"BookingToVehicle"},{"name":"type","kind":"enum","type":"BookingType"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"pickupLocation","kind":"scalar","type":"String"},{"name":"dropoffLocation","kind":"scalar","type":"String"},{"name":"pickupDate","kind":"scalar","type":"DateTime"},{"name":"flightNumber","kind":"scalar","type":"String"},{"name":"passengerCount","kind":"scalar","type":"Int"},{"name":"luggageCount","kind":"scalar","type":"Int"},{"name":"customerName","kind":"scalar","type":"String"},{"name":"customerEmail","kind":"scalar","type":"String"},{"name":"customerPhone","kind":"scalar","type":"String"},{"name":"specialRequests","kind":"scalar","type":"String"},{"name":"quotedPrice","kind":"scalar","type":"Decimal"},{"name":"distanceKm","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paystackReference","kind":"scalar","type":"String"},{"name":"adminNotes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CmsPage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"featuredImageUrl","kind":"scalar","type":"String"},{"name":"featuredImageAlt","kind":"scalar","type":"String"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"SiteSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","bookings","_count","vehicle","accounts","sessions","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","_avg","_sum","Account.groupBy","Account.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","VerificationToken.findUnique","VerificationToken.findUniqueOrThrow","VerificationToken.findFirst","VerificationToken.findFirstOrThrow","VerificationToken.findMany","VerificationToken.createOne","VerificationToken.createMany","VerificationToken.createManyAndReturn","VerificationToken.updateOne","VerificationToken.updateMany","VerificationToken.updateManyAndReturn","VerificationToken.upsertOne","VerificationToken.deleteOne","VerificationToken.deleteMany","VerificationToken.groupBy","VerificationToken.aggregate","Vehicle.findUnique","Vehicle.findUniqueOrThrow","Vehicle.findFirst","Vehicle.findFirstOrThrow","Vehicle.findMany","Vehicle.createOne","Vehicle.createMany","Vehicle.createManyAndReturn","Vehicle.updateOne","Vehicle.updateMany","Vehicle.updateManyAndReturn","Vehicle.upsertOne","Vehicle.deleteOne","Vehicle.deleteMany","Vehicle.groupBy","Vehicle.aggregate","imageMedia","blogPosts","Media.findUnique","Media.findUniqueOrThrow","Media.findFirst","Media.findFirstOrThrow","Media.findMany","Media.createOne","Media.createMany","Media.createManyAndReturn","Media.updateOne","Media.updateMany","Media.updateManyAndReturn","Media.upsertOne","Media.deleteOne","Media.deleteMany","Media.groupBy","Media.aggregate","BlogPost.findUnique","BlogPost.findUniqueOrThrow","BlogPost.findFirst","BlogPost.findFirstOrThrow","BlogPost.findMany","BlogPost.createOne","BlogPost.createMany","BlogPost.createManyAndReturn","BlogPost.updateOne","BlogPost.updateMany","BlogPost.updateManyAndReturn","BlogPost.upsertOne","BlogPost.deleteOne","BlogPost.deleteMany","BlogPost.groupBy","BlogPost.aggregate","CorporateEnquiry.findUnique","CorporateEnquiry.findUniqueOrThrow","CorporateEnquiry.findFirst","CorporateEnquiry.findFirstOrThrow","CorporateEnquiry.findMany","CorporateEnquiry.createOne","CorporateEnquiry.createMany","CorporateEnquiry.createManyAndReturn","CorporateEnquiry.updateOne","CorporateEnquiry.updateMany","CorporateEnquiry.updateManyAndReturn","CorporateEnquiry.upsertOne","CorporateEnquiry.deleteOne","CorporateEnquiry.deleteMany","CorporateEnquiry.groupBy","CorporateEnquiry.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","Booking.groupBy","Booking.aggregate","CmsPage.findUnique","CmsPage.findUniqueOrThrow","CmsPage.findFirst","CmsPage.findFirstOrThrow","CmsPage.findMany","CmsPage.createOne","CmsPage.createMany","CmsPage.createManyAndReturn","CmsPage.updateOne","CmsPage.updateMany","CmsPage.updateManyAndReturn","CmsPage.upsertOne","CmsPage.deleteOne","CmsPage.deleteMany","CmsPage.groupBy","CmsPage.aggregate","SiteSetting.findUnique","SiteSetting.findUniqueOrThrow","SiteSetting.findFirst","SiteSetting.findFirstOrThrow","SiteSetting.findMany","SiteSetting.createOne","SiteSetting.createMany","SiteSetting.createManyAndReturn","SiteSetting.updateOne","SiteSetting.updateMany","SiteSetting.updateManyAndReturn","SiteSetting.upsertOne","SiteSetting.deleteOne","SiteSetting.deleteMany","SiteSetting.groupBy","SiteSetting.aggregate","AND","OR","NOT","id","key","value","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","slug","title","excerpt","content","featuredImageUrl","featuredImageAlt","metaTitle","metaDescription","isPublished","createdAt","updatedAt","reference","userId","vehicleId","BookingType","type","BookingStatus","status","pickupLocation","dropoffLocation","pickupDate","flightNumber","passengerCount","luggageCount","customerName","customerEmail","customerPhone","specialRequests","quotedPrice","distanceKm","PaymentMethod","paymentMethod","PaymentStatus","paymentStatus","paystackReference","adminNotes","company","contactName","email","phone","serviceType","message","CorporateEnquiryStatus","category","publishedAt","readTime","imageUrl","imageAlt","imageMediaId","sections","contentHtml","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","filename","originalName","mimeType","size","url","alt","caption","folder","every","some","none","name","description","capacity","basePrice","pricePerKm","isActive","sortOrder","identifier","token","expires","identifier_token","sessionToken","provider","providerAccountId","refresh_token","access_token","expires_at","token_type","scope","id_token","session_state","passwordHash","UserRole","role","emailVerified","image","provider_providerAccountId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "rwRksAEQBAAA4wIAIAcAAPsCACAIAAD8AgAgwwEAAPgCADDEAQAABwAQxQEAAPgCADDGAQEAAAAB3QFAALkCACHeAUAAuQIAIfoBAQAAAAH7AQEAtwIAIZgCAQC3AgAhrQIBALcCACGvAgAA-QKvAiKwAkAA-gIAIbECAQC3AgAhAQAAAAEAIB0DAACDAwAgBgAAhAMAIMMBAAD9AgAwxAEAAAMAEMUBAAD9AgAwxgEBAKoCACHdAUAAuQIAId4BQAC5AgAh3wEBAKoCACHgAQEAtwIAIeEBAQCqAgAh4wEAAP4C4wEi5QEAAP8C5QEi5gEBAKoCACHnAQEAqgIAIegBQAC5AgAh6QEBALcCACHqAQIA2wIAIesBAgDbAgAh7AEBAKoCACHtAQEAqgIAIe4BAQCqAgAh7wEBALcCACHwARAA4gIAIfEBEACAAwAh8wEAAIED8wEi9QEAAIID9QEi9gEBALcCACH3AQEAtwIAIQgDAACQBAAgBgAAkQQAIOABAACJAwAg6QEAAIkDACDvAQAAiQMAIPEBAACJAwAg9gEAAIkDACD3AQAAiQMAIB0DAACDAwAgBgAAhAMAIMMBAAD9AgAwxAEAAAMAEMUBAAD9AgAwxgEBAAAAAd0BQAC5AgAh3gFAALkCACHfAQEAAAAB4AEBALcCACHhAQEAqgIAIeMBAAD-AuMBIuUBAAD_AuUBIuYBAQCqAgAh5wEBAKoCACHoAUAAuQIAIekBAQC3AgAh6gECANsCACHrAQIA2wIAIewBAQCqAgAh7QEBAKoCACHuAQEAqgIAIe8BAQC3AgAh8AEQAOICACHxARAAgAMAIfMBAACBA_MBIvUBAACCA_UBIvYBAQC3AgAh9wEBALcCACEDAAAAAwAgAQAABAAwAgAABQAgEAQAAOMCACAHAAD7AgAgCAAA_AIAIMMBAAD4AgAwxAEAAAcAEMUBAAD4AgAwxgEBAKoCACHdAUAAuQIAId4BQAC5AgAh-gEBAKoCACH7AQEAtwIAIZgCAQC3AgAhrQIBALcCACGvAgAA-QKvAiKwAkAA-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_DAQAA6AIAMMQBAAA_ABDFAQAA6AIAMMYBAQClAgAh4AEBAKUCACHjAQEApQIAIaQCAQClAgAhpQIBAKUCACGmAgEArAIAIacCAQCsAgAhqAICAOkCACGpAgEArAIAIaoCAQCsAgAhqwIBAKwCACGsAgEArAIAIQMAAAALACABAAA-ADAaAAA_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-ACABAAAAcQAgAQAAAHQAIAcFAAC-AwAgGwAAwQMAIBwAAMADACAtAAC_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_wEBAAAAAYACQAAAAAGBAgEAAAABggIBAAAAAYMCAQAAAAGEAgEAAAABhQKAAAAAAYYCAQAAAAEBDgAAsAEAMAEOAACwAQAwAQAAAJABACASYQAApwMAIMYBAQCIAwAh1AEBAIgDACHVAQEAiAMAIdYBAQCIAwAh2gEBAI0DACHbAQEAjQMAIdwBIACOAwAh3QFAAI8DACHeAUAAjwMAIf8BAQCIAwAhgAJAAI8DACGBAgEAiAMAIYICAQCNAwAhgwIBAI0DACGEAgEAjQMAIYUCgAAAAAGGAgEAjQMAIQIAAACOAQAgDgAAtAEAIBHGAQEAiAMAIdQBAQCIAwAh1QEBAIgDACHWAQEAiAMAIdoBAQCNAwAh2wEBAI0DACHcASAAjgMAId0BQACPAwAh3gFAAI8DACH_AQEAiAMAIYACQACPAwAhgQIBAIgDACGCAgEAjQMAIYMCAQCNAwAhhAIBAI0DACGFAoAAAAABhgIBAI0DACECAAAAjAEAIA4AALYBACACAAAAjAEAIA4AALYBACABAAAAkAEAIAMAAACOAQAgFQAArgEAIBYAALQBACABAAAAjgEAIAEAAACMAQAgCQUAAKQDACAbAACmAwAgHAAApQMAINoBAACJAwAg2wEAAIkDACCCAgAAiQMAIIMCAACJAwAghAIAAIkDACCGAgAAiQMAIBTDAQAA1gIAMMQBAAC-AQAQxQEAANYCADDGAQEApQIAIdQBAQClAgAh1QEBAKUCACHWAQEApQIAIdoBAQCsAgAh2wEBAKwCACHcASAArQIAId0BQACuAgAh3gFAAK4CACH_AQEApQIAIYACQACuAgAhgQIBAKUCACGCAgEArAIAIYMCAQCsAgAhhAIBAKwCACGFAgAA1wIAIIYCAQCsAgAhAwAAAIwBACABAAC9AQAwGgAAvgEAIAMAAACMAQAgAQAAjQEAMAIAAI4BACAPwwEAANQCADDEAQAAxAEAEMUBAADUAgAwxgEBAAAAAd0BQAC5AgAh3gFAALkCACHfAQEAAAAB5QEAANUC_wEi9wEBALcCACH4AQEAqgIAIfkBAQCqAgAh-gEBAKoCACH7AQEAqgIAIfwBAQCqAgAh_QEBAKoCACEBAAAAwQEAIAEAAADBAQAgD8MBAADUAgAwxAEAAMQBABDFAQAA1AIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAId8BAQCqAgAh5QEAANUC_wEi9wEBALcCACH4AQEAqgIAIfkBAQCqAgAh-gEBAKoCACH7AQEAqgIAIfwBAQCqAgAh_QEBAKoCACEB9wEAAIkDACADAAAAxAEAIAEAAMUBADACAADBAQAgAwAAAMQBACABAADFAQAwAgAAwQEAIAMAAADEAQAgAQAAxQEAMAIAAMEBACAMxgEBAAAAAd0BQAAAAAHeAUAAAAAB3wEBAAAAAeUBAAAA_wEC9wEBAAAAAfgBAQAAAAH5AQEAAAAB-gEBAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQEOAADJAQAgDMYBAQAAAAHdAUAAAAAB3gFAAAAAAd8BAQAAAAHlAQAAAP8BAvcBAQAAAAH4AQEAAAAB-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQAAAAEBDgAAywEAMAEOAADLAQAwDMYBAQCIAwAh3QFAAI8DACHeAUAAjwMAId8BAQCIAwAh5QEAAKMD_wEi9wEBAI0DACH4AQEAiAMAIfkBAQCIAwAh-gEBAIgDACH7AQEAiAMAIfwBAQCIAwAh_QEBAIgDACECAAAAwQEAIA4AAM4BACAMxgEBAIgDACHdAUAAjwMAId4BQACPAwAh3wEBAIgDACHlAQAAowP_ASL3AQEAjQMAIfgBAQCIAwAh-QEBAIgDACH6AQEAiAMAIfsBAQCIAwAh_AEBAIgDACH9AQEAiAMAIQIAAADEAQAgDgAA0AEAIAIAAADEAQAgDgAA0AEAIAMAAADBAQAgFQAAyQEAIBYAAM4BACABAAAAwQEAIAEAAADEAQAgBAUAAKADACAbAACiAwAgHAAAoQMAIPcBAACJAwAgD8MBAADQAgAwxAEAANcBABDFAQAA0AIAMMYBAQClAgAh3QFAAK4CACHeAUAArgIAId8BAQClAgAh5QEAANEC_wEi9wEBAKwCACH4AQEApQIAIfkBAQClAgAh-gEBAKUCACH7AQEApQIAIfwBAQClAgAh_QEBAKUCACEDAAAAxAEAIAEAANYBADAaAADXAQAgAwAAAMQBACABAADFAQAwAgAAwQEAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgGgMAAJ4DACAGAACfAwAgxgEBAAAAAd0BQAAAAAHeAUAAAAAB3wEBAAAAAeABAQAAAAHhAQEAAAAB4wEAAADjAQLlAQAAAOUBAuYBAQAAAAHnAQEAAAAB6AFAAAAAAekBAQAAAAHqAQIAAAAB6wECAAAAAewBAQAAAAHtAQEAAAAB7gEBAAAAAe8BAQAAAAHwARAAAAAB8QEQAAAAAfMBAAAA8wEC9QEAAAD1AQL2AQEAAAAB9wEBAAAAAQEOAADfAQAgGMYBAQAAAAHdAUAAAAAB3gFAAAAAAd8BAQAAAAHgAQEAAAAB4QEBAAAAAeMBAAAA4wEC5QEAAADlAQLmAQEAAAAB5wEBAAAAAegBQAAAAAHpAQEAAAAB6gECAAAAAesBAgAAAAHsAQEAAAAB7QEBAAAAAe4BAQAAAAHvAQEAAAAB8AEQAAAAAfEBEAAAAAHzAQAAAPMBAvUBAAAA9QEC9gEBAAAAAfcBAQAAAAEBDgAA4QEAMAEOAADhAQAwAQAAAAcAIBoDAACcAwAgBgAAnQMAIMYBAQCIAwAh3QFAAI8DACHeAUAAjwMAId8BAQCIAwAh4AEBAI0DACHhAQEAiAMAIeMBAACVA-MBIuUBAACWA-UBIuYBAQCIAwAh5wEBAIgDACHoAUAAjwMAIekBAQCNAwAh6gECAJcDACHrAQIAlwMAIewBAQCIAwAh7QEBAIgDACHuAQEAiAMAIe8BAQCNAwAh8AEQAJgDACHxARAAmQMAIfMBAACaA_MBIvUBAACbA_UBIvYBAQCNAwAh9wEBAI0DACECAAAABQAgDgAA5QEAIBjGAQEAiAMAId0BQACPAwAh3gFAAI8DACHfAQEAiAMAIeABAQCNAwAh4QEBAIgDACHjAQAAlQPjASLlAQAAlgPlASLmAQEAiAMAIecBAQCIAwAh6AFAAI8DACHpAQEAjQMAIeoBAgCXAwAh6wECAJcDACHsAQEAiAMAIe0BAQCIAwAh7gEBAIgDACHvAQEAjQMAIfABEACYAwAh8QEQAJkDACHzAQAAmgPzASL1AQAAmwP1ASL2AQEAjQMAIfcBAQCNAwAhAgAAAAMAIA4AAOcBACACAAAAAwAgDgAA5wEAIAEAAAAHACADAAAABQAgFQAA3wEAIBYAAOUBACABAAAABQAgAQAAAAMAIAsFAACQAwAgGwAAkwMAIBwAAJIDACAtAACRAwAgLgAAlAMAIOABAACJAwAg6QEAAIkDACDvAQAAiQMAIPEBAACJAwAg9gEAAIkDACD3AQAAiQMAIBvDAQAAugIAMMQBAADvAQAQxQEAALoCADDGAQEApQIAId0BQACuAgAh3gFAAK4CACHfAQEApQIAIeABAQCsAgAh4QEBAKUCACHjAQAAuwLjASLlAQAAvALlASLmAQEApQIAIecBAQClAgAh6AFAAK4CACHpAQEArAIAIeoBAgC9AgAh6wECAL0CACHsAQEApQIAIe0BAQClAgAh7gEBAKUCACHvAQEArAIAIfABEAC-AgAh8QEQAL8CACHzAQAAwALzASL1AQAAwQL1ASL2AQEArAIAIfcBAQCsAgAhAwAAAAMAIAEAAO4BADAaAADvAQAgAwAAAAMAIAEAAAQAMAIAAAUAIA_DAQAAtgIAMMQBAAD1AQAQxQEAALYCADDGAQEAAAAB1AEBAAAAAdUBAQCqAgAh1gEBALcCACHXAQEAqgIAIdgBAQC3AgAh2QEBALcCACHaAQEAtwIAIdsBAQC3AgAh3AEgALgCACHdAUAAuQIAId4BQAC5AgAhAQAAAPIBACABAAAA8gEAIA_DAQAAtgIAMMQBAAD1AQAQxQEAALYCADDGAQEAqgIAIdQBAQCqAgAh1QEBAKoCACHWAQEAtwIAIdcBAQCqAgAh2AEBALcCACHZAQEAtwIAIdoBAQC3AgAh2wEBALcCACHcASAAuAIAId0BQAC5AgAh3gFAALkCACEF1gEAAIkDACDYAQAAiQMAINkBAACJAwAg2gEAAIkDACDbAQAAiQMAIAMAAAD1AQAgAQAA9gEAMAIAAPIBACADAAAA9QEAIAEAAPYBADACAADyAQAgAwAAAPUBACABAAD2AQAwAgAA8gEAIAzGAQEAAAAB1AEBAAAAAdUBAQAAAAHWAQEAAAAB1wEBAAAAAdgBAQAAAAHZAQEAAAAB2gEBAAAAAdsBAQAAAAHcASAAAAAB3QFAAAAAAd4BQAAAAAEBDgAA-gEAIAzGAQEAAAAB1AEBAAAAAdUBAQAAAAHWAQEAAAAB1wEBAAAAAdgBAQAAAAHZAQEAAAAB2gEBAAAAAdsBAQAAAAHcASAAAAAB3QFAAAAAAd4BQAAAAAEBDgAA_AEAMAEOAAD8AQAwDMYBAQCIAwAh1AEBAIgDACHVAQEAiAMAIdYBAQCNAwAh1wEBAIgDACHYAQEAjQMAIdkBAQCNAwAh2gEBAI0DACHbAQEAjQMAIdwBIACOAwAh3QFAAI8DACHeAUAAjwMAIQIAAADyAQAgDgAA_wEAIAzGAQEAiAMAIdQBAQCIAwAh1QEBAIgDACHWAQEAjQMAIdcBAQCIAwAh2AEBAI0DACHZAQEAjQMAIdoBAQCNAwAh2wEBAI0DACHcASAAjgMAId0BQACPAwAh3gFAAI8DACECAAAA9QEAIA4AAIECACACAAAA9QEAIA4AAIECACADAAAA8gEAIBUAAPoBACAWAAD_AQAgAQAAAPIBACABAAAA9QEAIAgFAACKAwAgGwAAjAMAIBwAAIsDACDWAQAAiQMAINgBAACJAwAg2QEAAIkDACDaAQAAiQMAINsBAACJAwAgD8MBAACrAgAwxAEAAIgCABDFAQAAqwIAMMYBAQClAgAh1AEBAKUCACHVAQEApQIAIdYBAQCsAgAh1wEBAKUCACHYAQEArAIAIdkBAQCsAgAh2gEBAKwCACHbAQEArAIAIdwBIACtAgAh3QFAAK4CACHeAUAArgIAIQMAAAD1AQAgAQAAhwIAMBoAAIgCACADAAAA9QEAIAEAAPYBADACAADyAQAgBsMBAACpAgAwxAEAAI4CABDFAQAAqQIAMMYBAQAAAAHHAQEAAAAByAEBAKoCACEBAAAAiwIAIAEAAACLAgAgBsMBAACpAgAwxAEAAI4CABDFAQAAqQIAMMYBAQCqAgAhxwEBAKoCACHIAQEAqgIAIQADAAAAjgIAIAEAAI8CADACAACLAgAgAwAAAI4CACABAACPAgAwAgAAiwIAIAMAAACOAgAgAQAAjwIAMAIAAIsCACADxgEBAAAAAccBAQAAAAHIAQEAAAABAQ4AAJMCACADxgEBAAAAAccBAQAAAAHIAQEAAAABAQ4AAJUCADABDgAAlQIAMAPGAQEAiAMAIccBAQCIAwAhyAEBAIgDACECAAAAiwIAIA4AAJgCACADxgEBAIgDACHHAQEAiAMAIcgBAQCIAwAhAgAAAI4CACAOAACaAgAgAgAAAI4CACAOAACaAgAgAwAAAIsCACAVAACTAgAgFgAAmAIAIAEAAACLAgAgAQAAAI4CACADBQAAhQMAIBsAAIcDACAcAACGAwAgBsMBAACkAgAwxAEAAKECABDFAQAApAIAMMYBAQClAgAhxwEBAKUCACHIAQEApQIAIQMAAACOAgAgAQAAoAIAMBoAAKECACADAAAAjgIAIAEAAI8CADACAACLAgAgBsMBAACkAgAwxAEAAKECABDFAQAApAIAMMYBAQClAgAhxwEBAKUCACHIAQEApQIAIQ4FAACnAgAgGwAAqAIAIBwAAKgCACDJAQEAAAABygEBAAAABMsBAQAAAATMAQEAAAABzQEBAAAAAc4BAQAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHSAQEAAAAB0wEBAKYCACEOBQAApwIAIBsAAKgCACAcAACoAgAgyQEBAAAAAcoBAQAAAATLAQEAAAAEzAEBAAAAAc0BAQAAAAHOAQEAAAABzwEBAAAAAdABAQAAAAHRAQEAAAAB0gEBAAAAAdMBAQCmAgAhCMkBAgAAAAHKAQIAAAAEywECAAAABMwBAgAAAAHNAQIAAAABzgECAAAAAc8BAgAAAAHTAQIApwIAIQvJAQEAAAABygEBAAAABMsBAQAAAATMAQEAAAABzQEBAAAAAc4BAQAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHSAQEAAAAB0wEBAKgCACEGwwEAAKkCADDEAQAAjgIAEMUBAACpAgAwxgEBAKoCACHHAQEAqgIAIcgBAQCqAgAhC8kBAQAAAAHKAQEAAAAEywEBAAAABMwBAQAAAAHNAQEAAAABzgEBAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdIBAQAAAAHTAQEAqAIAIQ_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_wEi9wEBAKwCACH4AQEApQIAIfkBAQClAgAh-gEBAKUCACH7AQEApQIAIfwBAQClAgAh_QEBAKUCACEHBQAApwIAIBsAANMCACAcAADTAgAgyQEAAAD_AQLKAQAAAP8BCMsBAAAA_wEI0wEAANIC_wEiBwUAAKcCACAbAADTAgAgHAAA0wIAIMkBAAAA_wECygEAAAD_AQjLAQAAAP8BCNMBAADSAv8BIgTJAQAAAP8BAsoBAAAA_wEIywEAAAD_AQjTAQAA0wL_ASIPwwEAANQCADDEAQAAxAEAEMUBAADUAgAwxgEBAKoCACHdAUAAuQIAId4BQAC5AgAh3wEBAKoCACHlAQAA1QL_ASL3AQEAtwIAIfgBAQCqAgAh-QEBAKoCACH6AQEAqgIAIfsBAQCqAgAh_AEBAKoCACH9AQEAqgIAIQTJAQAAAP8BAsoBAAAA_wEIywEAAAD_AQjTAQAA0wL_ASIUwwEAANYCADDEAQAAvgEAEMUBAADWAgAwxgEBAKUCACHUAQEApQIAIdUBAQClAgAh1gEBAKUCACHaAQEArAIAIdsBAQCsAgAh3AEgAK0CACHdAUAArgIAId4BQACuAgAh_wEBAKUCACGAAkAArgIAIYECAQClAgAhggIBAKwCACGDAgEArAIAIYQCAQCsAgAhhQIAANcCACCGAgEArAIAIQ8FAACnAgAgGwAA2AIAIBwAANgCACDJAYAAAAABzAGAAAAAAc0BgAAAAAHOAYAAAAABzwGAAAAAAdMBgAAAAAGHAgEAAAABiAIBAAAAAYkCAQAAAAGKAoAAAAABiwKAAAAAAYwCgAAAAAEMyQGAAAAAAcwBgAAAAAHNAYAAAAABzgGAAAAAAc8BgAAAAAHTAYAAAAABhwIBAAAAAYgCAQAAAAGJAgEAAAABigKAAAAAAYsCgAAAAAGMAoAAAAABDsMBAADZAgAwxAEAAKYBABDFAQAA2QIAMMYBAQClAgAh3QFAAK4CACHeAUAArgIAIY0CAQClAgAhjgIBAKUCACGPAgEApQIAIZACAgC9AgAhkQIBAKUCACGSAgEArAIAIZMCAQCsAgAhlAIBAKUCACEPYgAA3AIAIMMBAADaAgAwxAEAAJABABDFAQAA2gIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAIY0CAQCqAgAhjgIBAKoCACGPAgEAqgIAIZACAgDbAgAhkQIBAKoCACGSAgEAtwIAIZMCAQC3AgAhlAIBAKoCACEIyQECAAAAAcoBAgAAAATLAQIAAAAEzAECAAAAAc0BAgAAAAHOAQIAAAABzwECAAAAAdMBAgCnAgAhA5UCAACMAQAglgIAAIwBACCXAgAAjAEAIBVhAADfAgAgwwEAAN0CADDEAQAAjAEAEMUBAADdAgAwxgEBAKoCACHUAQEAqgIAIdUBAQCqAgAh1gEBAKoCACHaAQEAtwIAIdsBAQC3AgAh3AEgALgCACHdAUAAuQIAId4BQAC5AgAh_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_AIAIMMBAAD4AgAwxAEAAAcAEMUBAAD4AgAwxgEBAKoCACHdAUAAuQIAId4BQAC5AgAh-gEBAKoCACH7AQEAtwIAIZgCAQC3AgAhrQIBALcCACGvAgAA-QKvAiKwAkAA-gIAIbECAQC3AgAhswIAAAcAILQCAAAHACACpAIBAAAAAaUCAQAAAAEQAwAA9AIAIMMBAAD2AgAwxAEAAAsAEMUBAAD2AgAwxgEBAKoCACHgAQEAqgIAIeMBAQCqAgAhpAIBAKoCACGlAgEAqgIAIaYCAQC3AgAhpwIBALcCACGoAgIA9wIAIakCAQC3AgAhqgIBALcCACGrAgEAtwIAIawCAQC3AgAhCMkBAgAAAAHKAQIAAAAFywECAAAABcwBAgAAAAHNAQIAAAABzgECAAAAAc8BAgAAAAHTAQIAtAIAIRAEAADjAgAgBwAA-wIAIAgAAPwCACDDAQAA-AIAMMQBAAAHABDFAQAA-AIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAIfoBAQCqAgAh-wEBALcCACGYAgEAtwIAIa0CAQC3AgAhrwIAAPkCrwIisAJAAPoCACGxAgEAtwIAIQTJAQAAAK8CAsoBAAAArwIIywEAAACvAgjTAQAA8gKvAiIIyQFAAAAAAcoBQAAAAAXLAUAAAAAFzAFAAAAAAc0BQAAAAAHOAUAAAAABzwFAAAAAAdMBQADwAgAhA5UCAAALACCWAgAACwAglwIAAAsAIAOVAgAADwAglgIAAA8AIJcCAAAPACAdAwAAgwMAIAYAAIQDACDDAQAA_QIAMMQBAAADABDFAQAA_QIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAId8BAQCqAgAh4AEBALcCACHhAQEAqgIAIeMBAAD-AuMBIuUBAAD_AuUBIuYBAQCqAgAh5wEBAKoCACHoAUAAuQIAIekBAQC3AgAh6gECANsCACHrAQIA2wIAIewBAQCqAgAh7QEBAKoCACHuAQEAqgIAIe8BAQC3AgAh8AEQAOICACHxARAAgAMAIfMBAACBA_MBIvUBAACCA_UBIvYBAQC3AgAh9wEBALcCACEEyQEAAADjAQLKAQAAAOMBCMsBAAAA4wEI0wEAAM8C4wEiBMkBAAAA5QECygEAAADlAQjLAQAAAOUBCNMBAADNAuUBIgjJARAAAAABygEQAAAABcsBEAAAAAXMARAAAAABzQEQAAAAAc4BEAAAAAHPARAAAAAB0wEQAMcCACEEyQEAAADzAQLKAQAAAPMBCMsBAAAA8wEI0wEAAMUC8wEiBMkBAAAA9QECygEAAAD1AQjLAQAAAPUBCNMBAADDAvUBIhIEAADjAgAgBwAA-wIAIAgAAPwCACDDAQAA-AIAMMQBAAAHABDFAQAA-AIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAIfoBAQCqAgAh-wEBALcCACGYAgEAtwIAIa0CAQC3AgAhrwIAAPkCrwIisAJAAPoCACGxAgEAtwIAIbMCAAAHACC0AgAABwAgEQQAAOMCACDDAQAA4QIAMMQBAAB0ABDFAQAA4QIAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAIYICAQC3AgAhmAIBAKoCACGZAgEAtwIAIZoCAgDbAgAhmwIQAOICACGcAhAA4gIAIZ0CIAC4AgAhngICANsCACGzAgAAdAAgtAIAAHQAIAAAAAG4AgEAAAABAAAAAAG4AgEAAAABAbgCIAAAAAEBuAJAAAAAAQAAAAAAAbgCAAAA4wECAbgCAAAA5QECBbgCAgAAAAG-AgIAAAABvwICAAAAAcACAgAAAAHBAgIAAAABBbgCEAAAAAG-AhAAAAABvwIQAAAAAcACEAAAAAHBAhAAAAABBbgCEAAAAAG-AhAAAAABvwIQAAAAAcACEAAAAAHBAhAAAAABAbgCAAAA8wECAbgCAAAA9QECBxUAAKgEACAWAACuBAAgtQIAAKkEACC2AgAArQQAILkCAAAHACC6AgAABwAguwIAAAEAIAUVAACmBAAgFgAAqwQAILUCAACnBAAgtgIAAKoEACC7AgAAcQAgAxUAAKgEACC1AgAAqQQAILsCAAABACADFQAApgQAILUCAACnBAAguwIAAHEAIAAAAAG4AgAAAP8BAgAAAAcVAAChBAAgFgAApAQAILUCAACiBAAgtgIAAKMEACC5AgAAkAEAILoCAACQAQAguwIAAIoBACADFQAAoQQAILUCAACiBAAguwIAAIoBACAAAAAAAAsVAACvAwAwFgAAtAMAMLUCAACwAwAwtgIAALEDADC3AgAAsgMAILgCAACzAwAwuQIAALMDADC6AgAAswMAMLsCAACzAwAwvAIAALUDADC9AgAAtgMAMBDGAQEAAAAB1AEBAAAAAdUBAQAAAAHWAQEAAAAB2gEBAAAAAdsBAQAAAAHcASAAAAAB3QFAAAAAAd4BQAAAAAH_AQEAAAABgAJAAAAAAYECAQAAAAGCAgEAAAABgwIBAAAAAYUCgAAAAAGGAgEAAAABAgAAAI4BACAVAAC6AwAgAwAAAI4BACAVAAC6AwAgFgAAuQMAIAEOAACgBAAwFWEAAN8CACDDAQAA3QIAMMQBAACMAQAQxQEAAN0CADDGAQEAAAAB1AEBAAAAAdUBAQCqAgAh1gEBAKoCACHaAQEAtwIAIdsBAQC3AgAh3AEgALgCACHdAUAAuQIAId4BQAC5AgAh_wEBAKoCACGAAkAAuQIAIYECAQCqAgAhggIBALcCACGDAgEAtwIAIYQCAQC3AgAhhQIAAN4CACCGAgEAtwIAIQIAAACOAQAgDgAAuQMAIAIAAAC3AwAgDgAAuAMAIBTDAQAAtgMAMMQBAAC3AwAQxQEAALYDADDGAQEAqgIAIdQBAQCqAgAh1QEBAKoCACHWAQEAqgIAIdoBAQC3AgAh2wEBALcCACHcASAAuAIAId0BQAC5AgAh3gFAALkCACH_AQEAqgIAIYACQAC5AgAhgQIBAKoCACGCAgEAtwIAIYMCAQC3AgAhhAIBALcCACGFAgAA3gIAIIYCAQC3AgAhFMMBAAC2AwAwxAEAALcDABDFAQAAtgMAMMYBAQCqAgAh1AEBAKoCACHVAQEAqgIAIdYBAQCqAgAh2gEBALcCACHbAQEAtwIAIdwBIAC4AgAh3QFAALkCACHeAUAAuQIAIf8BAQCqAgAhgAJAALkCACGBAgEAqgIAIYICAQC3AgAhgwIBALcCACGEAgEAtwIAIYUCAADeAgAghgIBALcCACEQxgEBAIgDACHUAQEAiAMAIdUBAQCIAwAh1gEBAIgDACHaAQEAjQMAIdsBAQCNAwAh3AEgAI4DACHdAUAAjwMAId4BQACPAwAh_wEBAIgDACGAAkAAjwMAIYECAQCIAwAhggIBAI0DACGDAgEAjQMAIYUCgAAAAAGGAgEAjQMAIRDGAQEAiAMAIdQBAQCIAwAh1QEBAIgDACHWAQEAiAMAIdoBAQCNAwAh2wEBAI0DACHcASAAjgMAId0BQACPAwAh3gFAAI8DACH_AQEAiAMAIYACQACPAwAhgQIBAIgDACGCAgEAjQMAIYMCAQCNAwAhhQKAAAAAAYYCAQCNAwAhEMYBAQAAAAHUAQEAAAAB1QEBAAAAAdYBAQAAAAHaAQEAAAAB2wEBAAAAAdwBIAAAAAHdAUAAAAAB3gFAAAAAAf8BAQAAAAGAAkAAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhQKAAAAAAYYCAQAAAAEEFQAArwMAMLUCAACwAwAwtwIAALIDACC7AgAAswMAMAADYgAAvAMAIJICAACJAwAgkwIAAIkDACAAAAAAAAsVAADEAwAwFgAAyQMAMLUCAADFAwAwtgIAAMYDADC3AgAAxwMAILgCAADIAwAwuQIAAMgDADC6AgAAyAMAMLsCAADIAwAwvAIAAMoDADC9AgAAywMAMBgDAACeAwAgxgEBAAAAAd0BQAAAAAHeAUAAAAAB3wEBAAAAAeABAQAAAAHjAQAAAOMBAuUBAAAA5QEC5gEBAAAAAecBAQAAAAHoAUAAAAAB6QEBAAAAAeoBAgAAAAHrAQIAAAAB7AEBAAAAAe0BAQAAAAHuAQEAAAAB7wEBAAAAAfABEAAAAAHxARAAAAAB8wEAAADzAQL1AQAAAPUBAvYBAQAAAAH3AQEAAAABAgAAAAUAIBUAAM8DACADAAAABQAgFQAAzwMAIBYAAM4DACABDgAAnwQAMB0DAACDAwAgBgAAhAMAIMMBAAD9AgAwxAEAAAMAEMUBAAD9AgAwxgEBAAAAAd0BQAC5AgAh3gFAALkCACHfAQEAAAAB4AEBALcCACHhAQEAqgIAIeMBAAD-AuMBIuUBAAD_AuUBIuYBAQCqAgAh5wEBAKoCACHoAUAAuQIAIekBAQC3AgAh6gECANsCACHrAQIA2wIAIewBAQCqAgAh7QEBAKoCACHuAQEAqgIAIe8BAQC3AgAh8AEQAOICACHxARAAgAMAIfMBAACBA_MBIvUBAACCA_UBIvYBAQC3AgAh9wEBALcCACECAAAABQAgDgAAzgMAIAIAAADMAwAgDgAAzQMAIBvDAQAAywMAMMQBAADMAwAQxQEAAMsDADDGAQEAqgIAId0BQAC5AgAh3gFAALkCACHfAQEAqgIAIeABAQC3AgAh4QEBAKoCACHjAQAA_gLjASLlAQAA_wLlASLmAQEAqgIAIecBAQCqAgAh6AFAALkCACHpAQEAtwIAIeoBAgDbAgAh6wECANsCACHsAQEAqgIAIe0BAQCqAgAh7gEBAKoCACHvAQEAtwIAIfABEADiAgAh8QEQAIADACHzAQAAgQPzASL1AQAAggP1ASL2AQEAtwIAIfcBAQC3AgAhG8MBAADLAwAwxAEAAMwDABDFAQAAywMAMMYBAQCqAgAh3QFAALkCACHeAUAAuQIAId8BAQCqAgAh4AEBALcCACHhAQEAqgIAIeMBAAD-AuMBIuUBAAD_AuUBIuYBAQCqAgAh5wEBAKoCACHoAUAAuQIAIekBAQC3AgAh6gECANsCACHrAQIA2wIAIewBAQCqAgAh7QEBAKoCACHuAQEAqgIAIe8BAQC3AgAh8AEQAOICACHxARAAgAMAIfMBAACBA_MBIvUBAACCA_UBIvYBAQC3AgAh9wEBALcCACEXxgEBAIgDACHdAUAAjwMAId4BQACPAwAh3wEBAIgDACHgAQEAjQMAIeMBAACVA-MBIuUBAACWA-UBIuYBAQCIAwAh5wEBAIgDACHoAUAAjwMAIekBAQCNAwAh6gECAJcDACHrAQIAlwMAIewBAQCIAwAh7QEBAIgDACHuAQEAiAMAIe8BAQCNAwAh8AEQAJgDACHxARAAmQMAIfMBAACaA_MBIvUBAACbA_UBIvYBAQCNAwAh9wEBAI0DACEYAwAAnAMAIMYBAQCIAwAh3QFAAI8DACHeAUAAjwMAId8BAQCIAwAh4AEBAI0DACHjAQAAlQPjASLlAQAAlgPlASLmAQEAiAMAIecBAQCIAwAh6AFAAI8DACHpAQEAjQMAIeoBAgCXAwAh6wECAJcDACHsAQEAiAMAIe0BAQCIAwAh7gEBAIgDACHvAQEAjQMAIfABEACYAwAh8QEQAJkDACHzAQAAmgPzASL1AQAAmwP1ASL2AQEAjQMAIfcBAQCNAwAhGAMAAJ4DACDGAQEAAAAB3QFAAAAAAd4BQAAAAAHfAQEAAAAB4AEBAAAAAeMBAAAA4wEC5QEAAADlAQLmAQEAAAAB5wEBAAAAAegBQAAAAAHpAQEAAAAB6gECAAAAAesBAgAAAAHsAQEAAAAB7QEBAAAAAe4BAQAAAAHvAQEAAAAB8AEQAAAAAfEBEAAAAAHzAQAAAPMBAvUBAAAA9QEC9gEBAAAAAfcBAQAAAAEEFQAAxAMAMLUCAADFAwAwtwIAAMcDACC7AgAAyAMAMAAAAAAAAAAFFQAAmgQAIBYAAJ0EACC1AgAAmwQAILYCAACcBAAguwIAAAEAIAMVAACaBAAgtQIAAJsEACC7AgAAAQAgAAAAAAAFuAICAAAAAb4CAgAAAAG_AgIAAAABwAICAAAAAcECAgAAAAEFFQAAlQQAIBYAAJgEACC1AgAAlgQAILYCAACXBAAguwIAAAEAIAMVAACVBAAgtQIAAJYEACC7AgAAAQAgAAAAAbgCAAAArwICAbgCQAAAAAELFQAAggQAMBYAAIYEADC1AgAAgwQAMLYCAACEBAAwtwIAAIUEACC4AgAAyAMAMLkCAADIAwAwugIAAMgDADC7AgAAyAMAMLwCAACHBAAwvQIAAMsDADALFQAA9gMAMBYAAPsDADC1AgAA9wMAMLYCAAD4AwAwtwIAAPkDACC4AgAA-gMAMLkCAAD6AwAwugIAAPoDADC7AgAA-gMAMLwCAAD8AwAwvQIAAP0DADALFQAA6gMAMBYAAO8DADC1AgAA6wMAMLYCAADsAwAwtwIAAO0DACC4AgAA7gMAMLkCAADuAwAwugIAAO4DADC7AgAA7gMAMLwCAADwAwAwvQIAAPEDADADxgEBAAAAAaECQAAAAAGjAgEAAAABAgAAABEAIBUAAPUDACADAAAAEQAgFQAA9QMAIBYAAPQDACABDgAAlAQAMAgDAAD0AgAgwwEAAPMCADDEAQAADwAQxQEAAPMCADDGAQEAAAAB4AEBAKoCACGhAkAAuQIAIaMCAQAAAAECAAAAEQAgDgAA9AMAIAIAAADyAwAgDgAA8wMAIAfDAQAA8QMAMMQBAADyAwAQxQEAAPEDADDGAQEAqgIAIeABAQCqAgAhoQJAALkCACGjAgEAqgIAIQfDAQAA8QMAMMQBAADyAwAQxQEAAPEDADDGAQEAqgIAIeABAQCqAgAhoQJAALkCACGjAgEAqgIAIQPGAQEAiAMAIaECQACPAwAhowIBAIgDACEDxgEBAIgDACGhAkAAjwMAIaMCAQCIAwAhA8YBAQAAAAGhAkAAAAABowIBAAAAAQvGAQEAAAAB4wEBAAAAAaQCAQAAAAGlAgEAAAABpgIBAAAAAacCAQAAAAGoAgIAAAABqQIBAAAAAaoCAQAAAAGrAgEAAAABrAIBAAAAAQIAAAANACAVAACBBAAgAwAAAA0AIBUAAIEEACAWAACABAAgAQ4AAJMEADARAwAA9AIAIMMBAAD2AgAwxAEAAAsAEMUBAAD2AgAwxgEBAAAAAeABAQCqAgAh4wEBAKoCACGkAgEAqgIAIaUCAQCqAgAhpgIBALcCACGnAgEAtwIAIagCAgD3AgAhqQIBALcCACGqAgEAtwIAIasCAQC3AgAhrAIBALcCACGyAgAA9QIAIAIAAAANACAOAACABAAgAgAAAP4DACAOAAD_AwAgD8MBAAD9AwAwxAEAAP4DABDFAQAA_QMAMMYBAQCqAgAh4AEBAKoCACHjAQEAqgIAIaQCAQCqAgAhpQIBAKoCACGmAgEAtwIAIacCAQC3AgAhqAICAPcCACGpAgEAtwIAIaoCAQC3AgAhqwIBALcCACGsAgEAtwIAIQ_DAQAA_QMAMMQBAAD-AwAQxQEAAP0DADDGAQEAqgIAIeABAQCqAgAh4wEBAKoCACGkAgEAqgIAIaUCAQCqAgAhpgIBALcCACGnAgEAtwIAIagCAgD3AgAhqQIBALcCACGqAgEAtwIAIasCAQC3AgAhrAIBALcCACELxgEBAIgDACHjAQEAiAMAIaQCAQCIAwAhpQIBAIgDACGmAgEAjQMAIacCAQCNAwAhqAICAN8DACGpAgEAjQMAIaoCAQCNAwAhqwIBAI0DACGsAgEAjQMAIQvGAQEAiAMAIeMBAQCIAwAhpAIBAIgDACGlAgEAiAMAIaYCAQCNAwAhpwIBAI0DACGoAgIA3wMAIakCAQCNAwAhqgIBAI0DACGrAgEAjQMAIawCAQCNAwAhC8YBAQAAAAHjAQEAAAABpAIBAAAAAaUCAQAAAAGmAgEAAAABpwIBAAAAAagCAgAAAAGpAgEAAAABqgIBAAAAAasCAQAAAAGsAgEAAAABGAYAAJ8DACDGAQEAAAAB3QFAAAAAAd4BQAAAAAHfAQEAAAAB4QEBAAAAAeMBAAAA4wEC5QEAAADlAQLmAQEAAAAB5wEBAAAAAegBQAAAAAHpAQEAAAAB6gECAAAAAesBAgAAAAHsAQEAAAAB7QEBAAAAAe4BAQAAAAHvAQEAAAAB8AEQAAAAAfEBEAAAAAHzAQAAAPMBAvUBAAAA9QEC9gEBAAAAAfcBAQAAAAECAAAABQAgFQAAigQAIAMAAAAFACAVAACKBAAgFgAAiQQAIAEOAACSBAAwAgAAAAUAIA4AAIkEACACAAAAzAMAIA4AAIgEACAXxgEBAIgDACHdAUAAjwMAId4BQACPAwAh3wEBAIgDACHhAQEAiAMAIeMBAACVA-MBIuUBAACWA-UBIuYBAQCIAwAh5wEBAIgDACHoAUAAjwMAIekBAQCNAwAh6gECAJcDACHrAQIAlwMAIewBAQCIAwAh7QEBAIgDACHuAQEAiAMAIe8BAQCNAwAh8AEQAJgDACHxARAAmQMAIfMBAACaA_MBIvUBAACbA_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_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_uwEygAG8AQiBAb8BP4IBwAFDgwHCAUSEAcMBRIUBxgFEhgHHAUSHAcgBRIgBygFEiQHMAQiKAc0BRYsBzwFEjAHRAQiNAdIBRo4B0wFEjwHUAUSQAdUBCJEB2AFHkgHZAUuTAdoBApQB2wEClQHcAQKWAd0BApcB3gECmAHgAQKZAeIBCJoB4wFMmwHmAQKcAegBCJ0B6QFNngHrAQKfAewBAqAB7QEIoQHwAU6iAfEBVKMB8wFVpAH0AVWlAfcBVaYB-AFVpwH5AVWoAfsBVakB_QEIqgH-AVarAYACVawBggIIrQGDAleuAYQCVa8BhQJVsAGGAgixAYkCWLIBigJcswGMAl20AY0CXbUBkAJdtgGRAl23AZICXbgBlAJduQGWAgi6AZcCXrsBmQJdvAGbAgi9AZwCX74BnQJdvwGeAl3AAZ8CCMEBogJgwgGjAmQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("node:buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/blog-images.ts
var BLOG_IMAGES = {
  "how-fast-vessel-supply-support-protects-turnaround": {
    image: "/gallery/mgeswitch-ship-provisions-container-01.jpeg",
    imageAlt: "MGE-SWITCH ship agency operations at a commercial port"
  },
  "what-good-marine-provisioning-looks-like-in-west-africa": {
    image: "/gallery/mgeswitch-marine-cabin-stores-02.jpeg",
    imageAlt: "Marine provisions and cabin stores prepared for vessel delivery"
  },
  "nautical-publications-and-why-bridge-teams-cannot-compromise": {
    image: "/images/services/protective-agency.png",
    imageAlt: "Nautical publications and navigation planning materials"
  },
  "choosing-lubricants-and-consumables-for-harsh-marine-environments": {
    image: "/images/services/ship-agency.png",
    imageAlt: "Marine lubricants and consumables for harsh operating conditions"
  }
};
function getBlogImageMeta(slug, fallbackTitle) {
  return BLOG_IMAGES[slug] ?? {
    image: "/gallery/mgeswitch-ship-provisions-container-01.jpeg",
    imageAlt: fallbackTitle
  };
}

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
var globalForPrisma = globalThis;
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter2 = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter: adapter2,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
}
var prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// src/lib/blog.ts
var RAW_BLOG_POSTS = [
  {
    slug: "how-fast-vessel-supply-support-protects-turnaround",
    title: "How Fast Vessel Supply Support Protects Turnaround Time",
    excerpt: "A premium supply partner is measured not only by what it can source, but by how quickly it can coordinate the right response when schedules tighten.",
    category: "Operations",
    publishedAt: "2026-08-15",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Turnaround pressure is one of the defining realities of port operations. A delay in technical stores, welfare items, or urgent consumables can quickly affect the wider call plan and create avoidable operational strain.",
          "That is why vessel support should be approached as an execution discipline, not just a shopping exercise. Speed matters, but so do clarity, packaging, and reliable communication."
        ]
      },
      {
        heading: "What strong turnaround support looks like",
        bullets: [
          "Rapid acknowledgement of the requirement",
          "Clear confirmation of product specification and availability",
          "Delivery planning aligned to the vessel's operational window",
          "A single point of contact who communicates proactively"
        ]
      },
      {
        heading: "Why responsiveness builds trust",
        paragraphs: [
          "Operators remember suppliers who reduce uncertainty. When a team responds early, confirms details accurately, and keeps execution calm, the supplier becomes part of the operational solution rather than another variable to manage."
        ]
      }
    ]
  },
  {
    slug: "what-good-marine-provisioning-looks-like-in-west-africa",
    title: "What Good Marine Provisioning Looks Like in West Africa",
    excerpt: "High-quality provisioning is about more than quantity. It requires product care, consistency, and practical understanding of crew expectations onboard.",
    category: "Provisions",
    publishedAt: "2026-08-12",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Provisioning shapes morale as much as readiness. Fresh produce, frozen foods, dry goods, beverages, bakery items, and day-to-day essentials all contribute to a voyage that feels properly supported."
        ]
      },
      {
        heading: "The difference between supply and premium supply",
        bullets: [
          "Attention to freshness and sourcing quality",
          "Careful product handling and practical packaging",
          "Awareness of dietary, cultural, and operational preferences",
          "Delivery arranged to suit the vessel's working rhythm"
        ]
      },
      {
        heading: "Why crew welfare matters",
        paragraphs: [
          "A vessel that is well supplied is easier to operate. Comfort items, toiletries, welfare consumables, and reliable food quality all help maintain onboard standards and reduce avoidable friction during long rotations."
        ]
      }
    ]
  },
  {
    slug: "nautical-publications-and-why-bridge-teams-cannot-compromise",
    title: "Nautical Publications and Why Bridge Teams Cannot Compromise",
    excerpt: "Current charts and approved navigation publications remain central to safe planning and regulatory confidence, especially for teams moving across multiple routes.",
    category: "Navigation",
    publishedAt: "2026-08-09",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Bridge teams depend on current information. Whether the requirement is AVCS, ADP, or AENP access, publication readiness is a core operational need rather than an optional extra."
        ]
      },
      {
        heading: "Why up-to-date references matter",
        bullets: [
          "Better voyage planning confidence",
          "Improved compliance readiness",
          "Reduced risk of outdated reference use",
          "Smoother preparation ahead of inspections and route changes"
        ]
      },
      {
        heading: "The supplier's role",
        paragraphs: [
          "A capable marine supplier should understand that navigation materials need the same urgency and attention as technical or welfare items. Reliable access and correct fulfilment are part of the premium service standard clients expect."
        ]
      }
    ]
  },
  {
    slug: "choosing-lubricants-and-consumables-for-harsh-marine-environments",
    title: "Choosing Lubricants and Consumables for Harsh Marine Environments",
    excerpt: "Marine-grade oils, greases, and associated consumables play a quiet but critical role in sustaining machinery performance at sea.",
    category: "Technical Supply",
    publishedAt: "2026-08-05",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Harsh operating environments place constant demands on engines, hydraulics, compressors, and mechanical systems. The wrong lubricant choice can increase wear, shorten service life, and undermine reliability over time."
        ]
      },
      {
        heading: "Categories that often require careful attention",
        bullets: [
          "Engine oils",
          "Hydraulic oils",
          "Transmission oils",
          "Brake fluids",
          "Compressor oils",
          "Marine greases"
        ]
      },
      {
        heading: "Why specification matters",
        paragraphs: [
          "Technical supply is strongest when the supplier respects vessel specification rather than improvising substitutions. Product suitability, documentation, and consistency are what turn a supply relationship into an operational asset."
        ]
      }
    ]
  }
];

// prisma/seed.ts
var adapter = new PrismaPg2({ connectionString: process.env.DATABASE_URL });
var prisma2 = new PrismaClient({ adapter });
async function main() {
  console.log("Seeding database...");
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma2.user.upsert({
    where: { email: "admin@mge-switch.com" },
    update: {},
    create: {
      email: "admin@mge-switch.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+233 000 000 000"
    }
  });
  console.log("Admin user:", admin.email);
  const vehicles = [
    {
      id: "executive-sedan",
      name: "Technical Stores",
      description: "Engine-room consumables, tools, and vessel-ready technical products sourced with specification in mind.",
      imageUrl: "/images/services/ship-agency.png",
      capacity: 3,
      basePrice: 150,
      pricePerKm: 8,
      sortOrder: 1
    },
    {
      id: "premium-suv",
      name: "Safety & Welfare",
      description: "Safety equipment, crew welfare items, and day-to-day support products for comfortable, compliant operations.",
      imageUrl: "/images/services/crew-change.png",
      capacity: 5,
      basePrice: 220,
      pricePerKm: 10,
      sortOrder: 2
    },
    {
      id: "luxury-van",
      name: "Navigation & Publications",
      description: "Nautical publications, charts, and specialty navigation support for bridge teams and vessel operators.",
      imageUrl: "/images/services/protective-agency.png",
      capacity: 10,
      basePrice: 350,
      pricePerKm: 12,
      sortOrder: 3
    }
  ];
  for (const vehicle of vehicles) {
    await prisma2.vehicle.upsert({
      where: { id: vehicle.id },
      update: {},
      create: vehicle
    });
  }
  console.log("Vehicles seeded");
  const cmsPages = [
    {
      slug: "about",
      title: "About MGE-SWITCH",
      excerpt: "A Ghanaian ship agency and allied services partner covering Tema, Takoradi, and Lome.",
      content: "<h2>Our mission</h2><p>MGE-SWITCH provides ship agency, husbandry, crew change, spares delivery, and protective attendance across Tema, Takoradi, and Lome.</p><h2>Headquarters</h2><p>We operate in Tema and Takoradi Ports of Ghana and in Lome, Togo.</p>",
      metaTitle: "About MGE-SWITCH",
      metaDescription: "Learn about MGE-SWITCH and our ship agency coverage across Tema, Takoradi, and Lome."
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How MGE-SWITCH collects, uses, and protects your personal data.",
      content: "<h2>Information we collect</h2><p>When you submit an enquiry or contact our team, we collect your name, email, phone number, company details, and request information necessary to respond effectively.</p><h2>How we use your data</h2><ul><li>To review and respond to enquiries</li><li>To coordinate service delivery and support</li><li>To improve our operational communication</li></ul><h2>Data retention</h2><p>Enquiry records are retained for operational and legal purposes. You may request deletion of non-essential data by contacting us.</p>",
      metaTitle: "Privacy Policy | MGE-SWITCH",
      metaDescription: "Privacy policy for MGE-SWITCH ship agency enquiries."
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms and conditions for MGE-SWITCH enquiries and service delivery.",
      content: "<h2>Enquiries and Supply</h2><p>All service requests are subject to product availability, vessel timing, and confirmed delivery details. Quotations and commitments are based on the final agreed scope.</p><h2>Changes</h2><p>Amendments to timing, specification, or quantities may affect availability and pricing. We encourage clients to communicate updates promptly.</p><h2>Safety and Compliance</h2><p>We reserve the right to decline requests that conflict with operational safety, compliance requirements, or lawful trade practice.</p>",
      metaTitle: "Terms of Service | MGE-SWITCH",
      metaDescription: "Terms and conditions for MGE-SWITCH ship agency services."
    }
  ];
  for (const page of cmsPages) {
    await prisma2.cmsPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: { ...page, isPublished: true }
    });
  }
  console.log("CMS pages seeded");
  for (const post of RAW_BLOG_POSTS) {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    await prisma2.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        readTime: post.readTime,
        imageUrl: image,
        imageAlt,
        sections: post.sections,
        isPublished: true
      }
    });
  }
  console.log("Blog posts seeded");
  for (const [key, value] of Object.entries({
    site_name: "MGE-SWITCH",
    site_tagline: "Premium Marine & Offshore Supply Solutions",
    contact_phone: "+233 000 000 000",
    contact_whatsapp: "233000000000",
    contact_email: "ops@mge-switch.com",
    contact_address: "Tema & Takoradi Ports, Ghana · Lome, Togo",
    seo_default_description: "MGE-SWITCH is a registered Ghanaian ship agency and allied services provider operating in Tema and Takoradi Ports of Ghana and Lome, Togo.",
    seo_og_image: "/images/mge-switch-og.svg",
    maintenance_mode: "false"
  })) {
    await prisma2.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value }
    });
  }
  console.log("Site settings seeded");
  console.log("Seed complete!");
}
main().catch(console.error).finally(() => prisma2.$disconnect());
