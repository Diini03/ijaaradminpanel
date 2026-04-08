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
}

export interface Property {
  id: string;
  name: string;
  type: "House" | "Apartment" | "Room" | "Villa" | "Office";
  location: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: "Active" | "Pending Approval" | "Rejected";
  agency: string;
  agencyId: string;
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

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  propertyName: string;
  method: "EVC Plus" | "Edahab" | "Golis" | "Bank Transfer";
  amount: number;
  date: string;
  status: "Paid" | "Pending" | "Failed";
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
}

// Helper to generate initials avatar URL
const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1B2559&color=fff&size=40`;

const propertyImg = (id: number) =>
  `https://images.unsplash.com/photo-${id}?w=80&h=60&fit=crop`;

// ─── Users ──────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: "U001", name: "Abdi Mohamed", email: "abdi@email.com", phone: "+252 61 234 5678", role: "Landlord", avatar: avatar("Abdi Mohamed"), city: "Mogadishu", status: "Active", joinedDate: "2025-01-15", rentals: 4 },
  { id: "U002", name: "Fadumo Hassan", email: "fadumo@email.com", phone: "+252 63 456 7890", role: "Tenant", avatar: avatar("Fadumo Hassan"), city: "Hargeisa", status: "Active", joinedDate: "2025-02-20", rentals: 1 },
  { id: "U003", name: "Omar Yusuf", email: "omar@email.com", phone: "+252 61 789 0123", role: "Landlord", avatar: avatar("Omar Yusuf"), city: "Kismayo", status: "Active", joinedDate: "2025-03-10", rentals: 6 },
  { id: "U004", name: "Halima Abdirahman", email: "halima@email.com", phone: "+252 62 321 6543", role: "Tenant", avatar: avatar("Halima Abdirahman"), city: "Bosaso", status: "Inactive", joinedDate: "2025-04-05", rentals: 0 },
  { id: "U005", name: "Ahmed Ali", email: "ahmed@email.com", phone: "+252 61 111 2222", role: "Agent", avatar: avatar("Ahmed Ali"), city: "Mogadishu", status: "Active", joinedDate: "2024-11-01", rentals: 12 },
  { id: "U006", name: "Nasra Ibrahim", email: "nasra@email.com", phone: "+252 63 555 6666", role: "Tenant", avatar: avatar("Nasra Ibrahim"), city: "Galkayo", status: "Active", joinedDate: "2025-05-12", rentals: 2 },
  { id: "U007", name: "Yusuf Osman", email: "yusuf@email.com", phone: "+252 62 777 8888", role: "Landlord", avatar: avatar("Yusuf Osman"), city: "Hargeisa", status: "Suspended", joinedDate: "2024-09-20", rentals: 3 },
  { id: "U008", name: "Sahra Warsame", email: "sahra@email.com", phone: "+252 61 999 0000", role: "Tenant", avatar: avatar("Sahra Warsame"), city: "Mogadishu", status: "Active", joinedDate: "2025-06-01", rentals: 1 },
];

// ─── Properties ─────────────────────────────────────────
export const mockProperties: Property[] = [
  { id: "P001", name: "Sunset Villa", type: "Villa", location: "Lido Beach Road", city: "Mogadishu", price: 1200, bedrooms: 4, bathrooms: 3, status: "Active", agency: "Mogadishu Realty", agencyId: "A001", thumbnail: propertyImg(1560448204250), listedDate: "2025-01-20" },
  { id: "P002", name: "Hargeisa Heights Apt", type: "Apartment", location: "26 June District", city: "Hargeisa", price: 650, bedrooms: 2, bathrooms: 1, status: "Active", agency: "Somali Homes", agencyId: "A002", thumbnail: propertyImg(1564013799919), listedDate: "2025-02-14" },
  { id: "P003", name: "Ocean View Room", type: "Room", location: "Hamarweyne", city: "Mogadishu", price: 250, bedrooms: 1, bathrooms: 1, status: "Pending Approval", agency: "Mogadishu Realty", agencyId: "A001", thumbnail: propertyImg(1502672260266), listedDate: "2025-03-05" },
  { id: "P004", name: "Kismayo Family House", type: "House", location: "Farjano District", city: "Kismayo", price: 800, bedrooms: 3, bathrooms: 2, status: "Active", agency: "South Properties", agencyId: "A003", thumbnail: propertyImg(1600596542815), listedDate: "2025-03-18" },
  { id: "P005", name: "Business Office Suite", type: "Office", location: "KM4 Road", city: "Mogadishu", price: 1500, bedrooms: 0, bathrooms: 1, status: "Pending Approval", agency: "Mogadishu Realty", agencyId: "A001", thumbnail: propertyImg(1497366216548), listedDate: "2025-04-01" },
  { id: "P006", name: "Bosaso Beach House", type: "House", location: "Coastal Road", city: "Bosaso", price: 900, bedrooms: 3, bathrooms: 2, status: "Rejected", agency: "Puntland Estates", agencyId: "A004", thumbnail: propertyImg(1600585154340), listedDate: "2025-04-10" },
  { id: "P007", name: "Galkayo Modern Apt", type: "Apartment", location: "Central District", city: "Galkayo", price: 500, bedrooms: 2, bathrooms: 1, status: "Active", agency: "Central Realty", agencyId: "A005", thumbnail: propertyImg(1600607687939), listedDate: "2025-05-02" },
  { id: "P008", name: "Hargeisa Studio", type: "Room", location: "Jigjiga Yar", city: "Hargeisa", price: 200, bedrooms: 1, bathrooms: 1, status: "Pending Approval", agency: "Somali Homes", agencyId: "A002", thumbnail: propertyImg(1600566753190), listedDate: "2025-05-15" },
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

// ─── Payments ───────────────────────────────────────────
export const mockPayments: Payment[] = [
  { id: "PAY001", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyName: "Sunset Villa", method: "EVC Plus", amount: 1200, date: "2025-06-01", status: "Paid" },
  { id: "PAY002", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyName: "Hargeisa Heights Apt", method: "Edahab", amount: 650, date: "2025-06-03", status: "Paid" },
  { id: "PAY003", userId: "U008", userName: "Sahra Warsame", userRole: "Tenant", userAvatar: avatar("Sahra Warsame"), propertyName: "Kismayo Family House", method: "EVC Plus", amount: 800, date: "2025-06-05", status: "Pending" },
  { id: "PAY004", userId: "U004", userName: "Halima Abdirahman", userRole: "Tenant", userAvatar: avatar("Halima Abdirahman"), propertyName: "Galkayo Modern Apt", method: "Golis", amount: 500, date: "2025-06-07", status: "Failed" },
  { id: "PAY005", userId: "U002", userName: "Fadumo Hassan", userRole: "Tenant", userAvatar: avatar("Fadumo Hassan"), propertyName: "Ocean View Room", method: "Bank Transfer", amount: 250, date: "2025-06-08", status: "Paid" },
  { id: "PAY006", userId: "U006", userName: "Nasra Ibrahim", userRole: "Tenant", userAvatar: avatar("Nasra Ibrahim"), propertyName: "Hargeisa Studio", method: "Edahab", amount: 200, date: "2025-06-10", status: "Pending" },
];

// ─── Agencies ───────────────────────────────────────────
export const mockAgencies: Agency[] = [
  { id: "A001", name: "Mogadishu Realty", type: "Company", avatar: avatar("Mogadishu Realty"), email: "info@mogadishurealty.so", phone: "+252 61 100 2000", city: "Mogadishu", status: "Verified", listings: 15, activeRentals: 8, licenseNumber: "MR-2024-001" },
  { id: "A002", name: "Somali Homes", type: "Company", avatar: avatar("Somali Homes"), email: "contact@somalihomes.so", phone: "+252 63 200 3000", city: "Hargeisa", status: "Verified", listings: 10, activeRentals: 5, licenseNumber: "SH-2024-002" },
  { id: "A003", name: "South Properties", type: "Individual", avatar: avatar("South Properties"), email: "south@properties.so", phone: "+252 61 300 4000", city: "Kismayo", status: "Pending", listings: 4, activeRentals: 2, licenseNumber: "SP-2024-003" },
  { id: "A004", name: "Puntland Estates", type: "Company", avatar: avatar("Puntland Estates"), email: "info@puntlandestates.so", phone: "+252 62 400 5000", city: "Bosaso", status: "Suspended", listings: 7, activeRentals: 0, licenseNumber: "PE-2024-004" },
  { id: "A005", name: "Central Realty", type: "Individual", avatar: avatar("Central Realty"), email: "central@realty.so", phone: "+252 62 500 6000", city: "Galkayo", status: "Verified", listings: 6, activeRentals: 3, licenseNumber: "CR-2024-005" },
  { id: "A006", name: "Berbera Housing", type: "Company", avatar: avatar("Berbera Housing"), email: "info@berberahousing.so", phone: "+252 63 600 7000", city: "Berbera", status: "Pending", listings: 3, activeRentals: 1, licenseNumber: "BH-2024-006" },
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
