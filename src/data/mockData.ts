// Ijaar Admin Panel - Mock Data for Somalia Rental Management

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Landlord" | "Tenant" | "Agent";
  avatar: string;
  city: string;
  status: "Active" | "Inactive" | "Suspended";
  joinedDate: string;
  rentals: number;
  level: string;
  profileImage: string;
  totalSpent: number;
  lastPaymentDate: string;
  lastPaymentStatus: "Paid" | "Pending" | "Failed";
  idVerified: boolean;
  idDocuments: string[];
}

export interface Owner {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  accountNumber: string;
}

export interface HouseRule {
  text: string;
  icon: string;
  active: boolean;
}

export interface HouseRules {
  id: string;
  title: string;
  rules: HouseRule[];
  agreementLink: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  type: "House" | "Apartment" | "Room" | "Villa" | "Office";
  location: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rentalDuration: "monthly" | "3monthly" | "yearly";
  rate: number;
  status: "Active" | "Pending Approval" | "Rejected";
  agency: string;
  agencyId: string;
  ownerId: string;
  images: string[];
  amenities: string[];
  houseRulesId: string;
  thumbnail: string;
  listedDate: string;
}

export interface RentalRequest {
  id: string;
  userId: string;
  userName: string;
  userRole: "Landlord" | "Tenant";
  userAvatar: string;
  propertyId: string;
  propertyName: string;
  propertySpecs: string;
  propertyThumbnail: string;
  agency: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface PaymentMethod {
  id: string;
  name: string;
  serviceProvider: string;
  active: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  propertyId: string;
  propertyName: string;
  method: string;
  methodId: string;
  amount: number;
  currency: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
  invoiceId: string;
  referenceNumber: string;
  houseRulesId: string;
}

export interface Transaction {
  id: string;
  paymentId: string;
  userId: string;
  propertyId: string;
  type: "rent" | "deposit";
  date: string;
  state: "pending" | "completed" | "cancelled";
  paymentMethodId: string;
}

export interface Invoice {
  id: string;
  userId: string;
  transactionId: string;
  paymentId: string;
  transactionDate: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
}

export interface Agency {
  id: string;
  name: string;
  type: "Company" | "Individual";
  avatar: string;
  email: string;
  phone: string;
  city: string;
  status: "Verified" | "Pending" | "Suspended";
  listings: number;
  activeRentals: number;
  licenseNumber: string;
  description: string;
  locations: string[];
  level: string;
  rate: number;
  totalProperties: number;
  totalActive: number;
  totalAvailable: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "notification" | "alert" | "reminder";
  isRead: boolean;
  sentAt: string;
}

// Helper to generate initials avatar URL
const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1B2559&color=fff&size=40`;

const propertyImg = (id: number) =>
  `https://images.unsplash.com/photo-${id}?w=80&h=60&fit=crop`;

const propertyImgLarge = (id: number) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=500&fit=crop`;

// ─── Owners ─────────────────────────────────────────────
export const mockOwners: Owner[] = [
  { id: "OW001", fullName: "Abdi Mohamed", phone: "+252 61 234 5678", address: "Lido Beach Road, Mogadishu", email: "abdi@email.com", accountNumber: "ACC-001-MOG" },
  { id: "OW002", fullName: "Omar Yusuf", phone: "+252 61 789 0123", address: "Farjano District, Kismayo", email: "omar@email.com", accountNumber: "ACC-002-KIS" },
  { id: "OW003", fullName: "Yusuf Osman", phone: "+252 62 777 8888", address: "Jigjiga Yar, Hargeisa", email: "yusuf@email.com", accountNumber: "ACC-003-HAR" },
  { id: "OW004", fullName: "Hassan Abdi", phone: "+252 62 400 5000", address: "Coastal Road, Bosaso", email: "hassan@email.com", accountNumber: "ACC-004-BOS" },
  { id: "OW005", fullName: "Ali Nur", phone: "+252 62 500 6000", address: "Central District, Galkayo", email: "ali@email.com", accountNumber: "ACC-005-GAL" },
];

// ─── House Rules ────────────────────────────────────────
export const mockHouseRules: HouseRules[] = [
  {
    id: "HR001", title: "Standard House Rules", ownerId: "OW001",
    rules: [
      { text: "No smoking allowed inside", icon: "cigarette-off", active: true },
      { text: "Pets allowed (small dogs only)", icon: "dog", active: true },
      { text: "Quiet hours after 10 PM", icon: "volume-x", active: true },
      { text: "No subletting", icon: "ban", active: true },
    ],
    agreementLink: "#", createdAt: "2025-01-01", updatedAt: "2025-06-01",
  },
  {
    id: "HR002", title: "Apartment Rules", ownerId: "OW003",
    rules: [
      { text: "No pets allowed", icon: "ban", active: true },
      { text: "No loud music", icon: "volume-x", active: true },
      { text: "Visitors must register at reception", icon: "clipboard", active: true },
    ],
    agreementLink: "#", createdAt: "2025-02-01", updatedAt: "2025-05-15",
  },
];

// ─── Users ──────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: "U001", name: "Abdi Mohamed", email: "abdi@email.com", phone: "+252 61 234 5678", role: "Landlord", avatar: avatar("Abdi Mohamed"), city: "Mogadishu", status: "Active", joinedDate: "2025-01-15", rentals: 4, level: "Premium", profileImage: avatar("Abdi Mohamed"), totalSpent: 0, lastPaymentDate: "", lastPaymentStatus: "Paid", idVerified: true, idDocuments: ["National ID"] },
  { id: "U002", name: "Fadumo Hassan", email: "fadumo@email.com", phone: "+252 63 456 7890", role: "Tenant", avatar: avatar("Fadumo Hassan"), city: "Hargeisa", status: "Active", joinedDate: "2025-02-20", rentals: 1, level: "Standard", profileImage: avatar("Fadumo Hassan"), totalSpent: 2100, lastPaymentDate: "2025-06-01", lastPaymentStatus: "Paid", idVerified: true, idDocuments: ["National ID", "Passport"] },
  { id: "U003", name: "Omar Yusuf", email: "omar@email.com", phone: "+252 61 789 0123", role: "Landlord", avatar: avatar("Omar Yusuf"), city: "Kismayo", status: "Active", joinedDate: "2025-03-10", rentals: 6, level: "Premium", profileImage: avatar("Omar Yusuf"), totalSpent: 0, lastPaymentDate: "", lastPaymentStatus: "Paid", idVerified: true, idDocuments: ["National ID"] },
  { id: "U004", name: "Halima Abdirahman", email: "halima@email.com", phone: "+252 62 321 6543", role: "Tenant", avatar: avatar("Halima Abdirahman"), city: "Bosaso", status: "Inactive", joinedDate: "2025-04-05", rentals: 0, level: "Standard", profileImage: avatar("Halima Abdirahman"), totalSpent: 500, lastPaymentDate: "2025-06-07", lastPaymentStatus: "Failed", idVerified: false, idDocuments: [] },
  { id: "U005", name: "Ahmed Ali", email: "ahmed@email.com", phone: "+252 61 111 2222", role: "Agent", avatar: avatar("Ahmed Ali"), city: "Mogadishu", status: "Active", joinedDate: "2024-11-01", rentals: 12, level: "Premium", profileImage: avatar("Ahmed Ali"), totalSpent: 0, lastPaymentDate: "", lastPaymentStatus: "Paid", idVerified: true, idDocuments: ["National ID", "Business License"] },
  { id: "U006", name: "Nasra Ibrahim", email: "nasra@email.com", phone: "+252 63 555 6666", role: "Tenant", avatar: avatar("Nasra Ibrahim"), city: "Galkayo", status: "Active", joinedDate: "2025-05-12", rentals: 2, level: "Standard", profileImage: avatar("Nasra Ibrahim"), totalSpent: 850, lastPaymentDate: "2025-06-10", lastPaymentStatus: "Pending", idVerified: true, idDocuments: ["National ID"] },
  { id: "U007", name: "Yusuf Osman", email: "yusuf@email.com", phone: "+252 62 777 8888", role: "Landlord", avatar: avatar("Yusuf Osman"), city: "Hargeisa", status: "Suspended", joinedDate: "2024-09-20", rentals: 3, level: "Standard", profileImage: avatar("Yusuf Osman"), totalSpent: 0, lastPaymentDate: "", lastPaymentStatus: "Paid", idVerified: true, idDocuments: ["National ID"] },
  { id: "U008", name: "Sahra Warsame", email: "sahra@email.com", phone: "+252 61 999 0000", role: "Tenant", avatar: avatar("Sahra Warsame"), city: "Mogadishu", status: "Active", joinedDate: "2025-06-01", rentals: 1, level: "Standard", profileImage: avatar("Sahra Warsame"), totalSpent: 800, lastPaymentDate: "2025-06-05", lastPaymentStatus: "Pending", idVerified: false, idDocuments: [] },
];

// ─── Properties ─────────────────────────────────────────
export const mockProperties: Property[] = [
  { id: "P001", name: "Sunset Villa", description: "This spacious villa is located near Lido Beach, offering stunning ocean views. Recently renovated with modern finishes, marble floors, and large windows that flood the space with natural light. Features 24/7 security, a private pool, and a landscaped garden. Perfect for families looking for luxury and comfort.", type: "Villa", location: "Lido Beach Road", city: "Mogadishu", price: 1200, bedrooms: 4, bathrooms: 3, sqft: 2800, rentalDuration: "monthly", rate: 4.8, status: "Active", agency: "Mogadishu Realty", agencyId: "A001", ownerId: "OW001", images: [propertyImgLarge(1560448204250), propertyImgLarge(1600596542815), propertyImgLarge(1600585154340), propertyImgLarge(1564013799919)], amenities: ["WiFi", "AC", "Pool", "Gym", "Parking", "Kitchen", "Laundry"], houseRulesId: "HR001", thumbnail: propertyImg(1560448204250), listedDate: "2025-01-20" },
  { id: "P002", name: "Hargeisa Heights Apt", description: "Modern two-bedroom apartment in the bustling 26 June District. Open-plan living and dining area, fully equipped kitchen, and a private balcony with city views. The building has an elevator, backup generator, and shared rooftop terrace.", type: "Apartment", location: "26 June District", city: "Hargeisa", price: 650, bedrooms: 2, bathrooms: 1, sqft: 950, rentalDuration: "monthly", rate: 4.5, status: "Active", agency: "Somali Homes", agencyId: "A002", ownerId: "OW003", images: [propertyImgLarge(1564013799919), propertyImgLarge(1560448204250), propertyImgLarge(1502672260266)], amenities: ["WiFi", "AC", "Parking", "Kitchen"], houseRulesId: "HR002", thumbnail: propertyImg(1564013799919), listedDate: "2025-02-14" },
  { id: "P003", name: "Ocean View Room", description: "Cozy studio room in the historic Hamarweyne district with partial ocean views. Includes basic furnishings, a small kitchenette, and shared bathroom facilities. Great for students or single professionals on a budget.", type: "Room", location: "Hamarweyne", city: "Mogadishu", price: 250, bedrooms: 1, bathrooms: 1, sqft: 350, rentalDuration: "monthly", rate: 3.8, status: "Pending Approval", agency: "Mogadishu Realty", agencyId: "A001", ownerId: "OW001", images: [propertyImgLarge(1502672260266), propertyImgLarge(1560448204250)], amenities: ["WiFi", "AC"], houseRulesId: "HR001", thumbnail: propertyImg(1502672260266), listedDate: "2025-03-05" },
  { id: "P004", name: "Kismayo Family House", description: "Spacious family home in the quiet Farjano District. Three bedrooms, large living room, modern kitchen, and a private courtyard with fruit trees. Walking distance to local markets and schools.", type: "House", location: "Farjano District", city: "Kismayo", price: 800, bedrooms: 3, bathrooms: 2, sqft: 1800, rentalDuration: "monthly", rate: 4.2, status: "Active", agency: "South Properties", agencyId: "A003", ownerId: "OW002", images: [propertyImgLarge(1600596542815), propertyImgLarge(1564013799919), propertyImgLarge(1600607687939)], amenities: ["WiFi", "Parking", "Kitchen", "Laundry", "TV"], houseRulesId: "HR001", thumbnail: propertyImg(1600596542815), listedDate: "2025-03-18" },
  { id: "P005", name: "Business Office Suite", description: "Premium office space on the busy KM4 Road. Features a large open-plan workspace, two private offices, a meeting room, and a reception area. Includes high-speed internet, central AC, and 24/7 building access.", type: "Office", location: "KM4 Road", city: "Mogadishu", price: 1500, bedrooms: 0, bathrooms: 1, sqft: 1200, rentalDuration: "monthly", rate: 4.6, status: "Pending Approval", agency: "Mogadishu Realty", agencyId: "A001", ownerId: "OW001", images: [propertyImgLarge(1497366216548), propertyImgLarge(1560448204250)], amenities: ["WiFi", "AC", "Parking"], houseRulesId: "HR002", thumbnail: propertyImg(1497366216548), listedDate: "2025-04-01" },
  { id: "P006", name: "Bosaso Beach House", description: "Beautiful beachfront property along the Bosaso coastline. Three bedrooms with ocean views, an outdoor patio, and direct beach access. Perfect for a relaxed coastal lifestyle.", type: "House", location: "Coastal Road", city: "Bosaso", price: 900, bedrooms: 3, bathrooms: 2, sqft: 2000, rentalDuration: "3monthly", rate: 4.0, status: "Rejected", agency: "Puntland Estates", agencyId: "A004", ownerId: "OW004", images: [propertyImgLarge(1600585154340), propertyImgLarge(1600596542815)], amenities: ["WiFi", "AC", "Pool", "Parking", "Kitchen"], houseRulesId: "HR001", thumbnail: propertyImg(1600585154340), listedDate: "2025-04-10" },
  { id: "P007", name: "Galkayo Modern Apt", description: "Newly built apartment in Galkayo's central district. Modern finishes, two spacious bedrooms, a bright living room, and a fully fitted kitchen. Secure building with on-site parking.", type: "Apartment", location: "Central District", city: "Galkayo", price: 500, bedrooms: 2, bathrooms: 1, sqft: 900, rentalDuration: "monthly", rate: 4.3, status: "Active", agency: "Central Realty", agencyId: "A005", ownerId: "OW005", images: [propertyImgLarge(1600607687939), propertyImgLarge(1564013799919)], amenities: ["WiFi", "AC", "Parking", "TV", "Kitchen"], houseRulesId: "HR002", thumbnail: propertyImg(1600607687939), listedDate: "2025-05-02" },
  { id: "P008", name: "Hargeisa Studio", description: "Compact studio apartment in the popular Jigjiga Yar neighborhood. Ideal for students or young professionals. Comes furnished with a bed, desk, wardrobe, and small kitchenette.", type: "Room", location: "Jigjiga Yar", city: "Hargeisa", price: 200, bedrooms: 1, bathrooms: 1, sqft: 300, rentalDuration: "monthly", rate: 3.5, status: "Pending Approval", agency: "Somali Homes", agencyId: "A002", ownerId: "OW003", images: [propertyImgLarge(1600566753190), propertyImgLarge(1564013799919)], amenities: ["WiFi", "AC"], houseRulesId: "HR002", thumbnail: propertyImg(1600566753190), listedDate: "2025-05-15" },
];

// ─── Rental Requests ────────────────────────────────────
export const mockRentalRequests: RentalRequest[] = [
  { id: "RR001", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyId: "P001", propertyName: "Sunset Villa", propertySpecs: "4 Bed · 3 Bath", propertyThumbnail: propertyImg(1560448204250), agency: "Mogadishu Realty", date: "2025-06-01", status: "Pending" },
  { id: "RR002", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyId: "P002", propertyName: "Hargeisa Heights Apt", propertySpecs: "2 Bed · 1 Bath", propertyThumbnail: propertyImg(1564013799919), agency: "Somali Homes", date: "2025-06-03", status: "Approved" },
  { id: "RR003", userId: "U008", userName: "Sahra Warsame", userRole: "Tenant", userAvatar: avatar("Sahra Warsame"), propertyId: "P004", propertyName: "Kismayo Family House", propertySpecs: "3 Bed · 2 Bath", propertyThumbnail: propertyImg(1600596542815), agency: "South Properties", date: "2025-06-05", status: "Pending" },
  { id: "RR004", userId: "U004", userName: "Halima Abdirahman", userRole: "Tenant", userAvatar: avatar("Halima Abdirahman"), propertyId: "P007", propertyName: "Galkayo Modern Apt", propertySpecs: "2 Bed · 1 Bath", propertyThumbnail: propertyImg(1600607687939), agency: "Central Realty", date: "2025-06-07", status: "Rejected" },
  { id: "RR005", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyId: "P003", propertyName: "Ocean View Room", propertySpecs: "1 Bed · 1 Bath", propertyThumbnail: propertyImg(1502672260266), agency: "Mogadishu Realty", date: "2025-06-08", status: "Pending" },
  { id: "RR006", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyId: "P008", propertyName: "Hargeisa Studio", propertySpecs: "1 Bed · 1 Bath", propertyThumbnail: propertyImg(1600566753190), agency: "Somali Homes", date: "2025-06-10", status: "Approved" },
];

// ─── Payment Methods ────────────────────────────────────
export const mockPaymentMethods: PaymentMethod[] = [
  { id: "PM001", name: "EVC Plus", serviceProvider: "Hormuud Telecom", active: true },
  { id: "PM002", name: "Edahab", serviceProvider: "Dahabshiil", active: true },
  { id: "PM003", name: "Golis", serviceProvider: "Golis Telecom", active: true },
  { id: "PM004", name: "Bank Transfer", serviceProvider: "Dahabshiil Bank", active: true },
];

// ─── Payments ───────────────────────────────────────────
export const mockPayments: Payment[] = [
  { id: "PAY001", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyId: "P001", propertyName: "Sunset Villa", method: "EVC Plus", methodId: "PM001", amount: 1200, currency: "SAR", date: "2025-06-01", status: "Paid", invoiceId: "INV001", referenceNumber: "REF-2025-0601-001", houseRulesId: "HR001" },
  { id: "PAY002", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyId: "P002", propertyName: "Hargeisa Heights Apt", method: "Edahab", methodId: "PM002", amount: 650, currency: "SAR", date: "2025-06-03", status: "Paid", invoiceId: "INV002", referenceNumber: "REF-2025-0603-002", houseRulesId: "HR002" },
  { id: "PAY003", userId: "U008", userName: "Sahra Warsame", userRole: "Tenant", userAvatar: avatar("Sahra Warsame"), propertyId: "P004", propertyName: "Kismayo Family House", method: "EVC Plus", methodId: "PM001", amount: 800, currency: "SAR", date: "2025-06-05", status: "Pending", invoiceId: "INV003", referenceNumber: "REF-2025-0605-003", houseRulesId: "HR001" },
  { id: "PAY004", userId: "U004", userName: "Halima Abdirahman", userRole: "Tenant", userAvatar: avatar("Halima Abdirahman"), propertyId: "P007", propertyName: "Galkayo Modern Apt", method: "Golis", methodId: "PM003", amount: 500, currency: "SAR", date: "2025-06-07", status: "Failed", invoiceId: "INV004", referenceNumber: "REF-2025-0607-004", houseRulesId: "HR002" },
  { id: "PAY005", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyId: "P003", propertyName: "Ocean View Room", method: "Bank Transfer", methodId: "PM004", amount: 250, currency: "SAR", date: "2025-06-08", status: "Paid", invoiceId: "INV005", referenceNumber: "REF-2025-0608-005", houseRulesId: "HR001" },
  { id: "PAY006", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyId: "P008", propertyName: "Hargeisa Studio", method: "Edahab", methodId: "PM002", amount: 200, currency: "SAR", date: "2025-06-10", status: "Pending", invoiceId: "INV006", referenceNumber: "REF-2025-0610-006", houseRulesId: "HR002" },
];

// ─── Transactions ───────────────────────────────────────
export const mockTransactions: Transaction[] = [
  { id: "TR001", paymentId: "PAY001", userId: "U002", propertyId: "P001", type: "rent", date: "2025-06-01", state: "completed", paymentMethodId: "PM001" },
  { id: "TR002", paymentId: "PAY002", userId: "U006", propertyId: "P002", type: "rent", date: "2025-06-03", state: "completed", paymentMethodId: "PM002" },
  { id: "TR003", paymentId: "PAY003", userId: "U008", propertyId: "P004", type: "deposit", date: "2025-06-05", state: "pending", paymentMethodId: "PM001" },
  { id: "TR004", paymentId: "PAY004", userId: "U004", propertyId: "P007", type: "rent", date: "2025-06-07", state: "cancelled", paymentMethodId: "PM003" },
  { id: "TR005", paymentId: "PAY005", userId: "U002", propertyId: "P003", type: "rent", date: "2025-06-08", state: "completed", paymentMethodId: "PM004" },
  { id: "TR006", paymentId: "PAY006", userId: "U006", propertyId: "P008", type: "deposit", date: "2025-06-10", state: "pending", paymentMethodId: "PM002" },
];

// ─── Invoices ───────────────────────────────────────────
export const mockInvoices: Invoice[] = [
  { id: "INV001", userId: "U002", transactionId: "TR001", paymentId: "PAY001", transactionDate: "2025-06-01", paymentStatus: "Paid" },
  { id: "INV002", userId: "U006", transactionId: "TR002", paymentId: "PAY002", transactionDate: "2025-06-03", paymentStatus: "Paid" },
  { id: "INV003", userId: "U008", transactionId: "TR003", paymentId: "PAY003", transactionDate: "2025-06-05", paymentStatus: "Pending" },
  { id: "INV004", userId: "U004", transactionId: "TR004", paymentId: "PAY004", transactionDate: "2025-06-07", paymentStatus: "Failed" },
  { id: "INV005", userId: "U002", transactionId: "TR005", paymentId: "PAY005", transactionDate: "2025-06-08", paymentStatus: "Paid" },
  { id: "INV006", userId: "U006", transactionId: "TR006", paymentId: "PAY006", transactionDate: "2025-06-10", paymentStatus: "Pending" },
];

// ─── Agencies ───────────────────────────────────────────
export const mockAgencies: Agency[] = [
  { id: "A001", name: "Mogadishu Realty", type: "Company", avatar: avatar("Mogadishu Realty"), email: "info@mogadishurealty.so", phone: "+252 61 100 2000", city: "Mogadishu", status: "Verified", listings: 15, activeRentals: 8, licenseNumber: "MR-2024-001", description: "Leading real estate agency in Mogadishu specializing in residential and commercial properties.", locations: ["Mogadishu", "Hargeisa"], level: "Premium", rate: 4.8, totalProperties: 15, totalActive: 12, totalAvailable: 5 },
  { id: "A002", name: "Somali Homes", type: "Company", avatar: avatar("Somali Homes"), email: "contact@somalihomes.so", phone: "+252 63 200 3000", city: "Hargeisa", status: "Verified", listings: 10, activeRentals: 5, licenseNumber: "SH-2024-002", description: "Trusted property management company serving Hargeisa and surrounding areas.", locations: ["Hargeisa", "Berbera"], level: "Standard", rate: 4.5, totalProperties: 10, totalActive: 8, totalAvailable: 3 },
  { id: "A003", name: "South Properties", type: "Individual", avatar: avatar("South Properties"), email: "south@properties.so", phone: "+252 61 300 4000", city: "Kismayo", status: "Pending", listings: 4, activeRentals: 2, licenseNumber: "SP-2024-003", description: "Independent property agent covering southern Somalia.", locations: ["Kismayo"], level: "Basic", rate: 3.9, totalProperties: 4, totalActive: 3, totalAvailable: 1 },
  { id: "A004", name: "Puntland Estates", type: "Company", avatar: avatar("Puntland Estates"), email: "info@puntlandestates.so", phone: "+252 62 400 5000", city: "Bosaso", status: "Suspended", listings: 7, activeRentals: 0, licenseNumber: "PE-2024-004", description: "Property company based in Puntland region, currently under review.", locations: ["Bosaso", "Galkayo"], level: "Standard", rate: 3.5, totalProperties: 7, totalActive: 0, totalAvailable: 0 },
  { id: "A005", name: "Central Realty", type: "Individual", avatar: avatar("Central Realty"), email: "central@realty.so", phone: "+252 62 500 6000", city: "Galkayo", status: "Verified", listings: 6, activeRentals: 3, licenseNumber: "CR-2024-005", description: "Experienced agent serving central Somalia with quality listings.", locations: ["Galkayo"], level: "Standard", rate: 4.3, totalProperties: 6, totalActive: 5, totalAvailable: 2 },
  { id: "A006", name: "Berbera Housing", type: "Company", avatar: avatar("Berbera Housing"), email: "info@berberahousing.so", phone: "+252 63 600 7000", city: "Berbera", status: "Pending", listings: 3, activeRentals: 1, licenseNumber: "BH-2024-006", description: "New housing agency focused on the Berbera port city area.", locations: ["Berbera"], level: "Basic", rate: 4.0, totalProperties: 3, totalActive: 2, totalAvailable: 1 },
];

// ─── Notifications ──────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: "N001", userId: "U001", title: "New Rental Request", message: "Fadumo Hassan has requested to rent Sunset Villa.", type: "notification", isRead: false, sentAt: "2025-06-01T10:30:00" },
  { id: "N002", userId: "U002", title: "Payment Confirmed", message: "Your payment of SAR 1,200 for Sunset Villa has been confirmed.", type: "notification", isRead: true, sentAt: "2025-06-01T11:00:00" },
  { id: "N003", userId: "U003", title: "Property Approved", message: "Your property 'Ocean View Room' has been approved and is now live.", type: "alert", isRead: false, sentAt: "2025-06-02T09:00:00" },
  { id: "N004", userId: "U004", title: "Payment Failed", message: "Your payment for Galkayo Modern Apt failed. Please try again.", type: "alert", isRead: false, sentAt: "2025-06-07T14:20:00" },
  { id: "N005", userId: "U005", title: "Rental Reminder", message: "Rent for Hargeisa Heights Apt is due in 3 days.", type: "reminder", isRead: true, sentAt: "2025-06-08T08:00:00" },
];

// ─── Dashboard Stats ────────────────────────────────────
export const dashboardStats = {
  totalProperties: 156,
  pendingListings: 23,
  pendingRequests: 18,
  activeRentals: 89,
  totalAgencies: 34,
  paymentSuccessRate: 94.2,
};

// ─── Chart Data ─────────────────────────────────────────
export const rentalRequestsChartData = [
  { week: "Week 1", requests: 12 },
  { week: "Week 2", requests: 19 },
  { week: "Week 3", requests: 15 },
  { week: "Week 4", requests: 25 },
  { week: "Week 5", requests: 22 },
  { week: "Week 6", requests: 30 },
  { week: "Week 7", requests: 28 },
  { week: "Week 8", requests: 35 },
];

export const newListingsChartData = [
  { week: "Week 1", listings: 5 },
  { week: "Week 2", listings: 8 },
  { week: "Week 3", listings: 6 },
  { week: "Week 4", listings: 12 },
  { week: "Week 5", listings: 9 },
  { week: "Week 6", listings: 15 },
  { week: "Week 7", listings: 11 },
  { week: "Week 8", listings: 18 },
];
