
# Ijaar Admin Panel — Implementation Plan

## Overview
Ijaar is a rental management platform for Somalia. This plan covers the full admin panel with 6 main pages, auth pages, settings, and all CRUD form pages — using static mock data with Somali-relevant details (SAR currency, Somali cities like Mogadishu, Hargeisa, Kismayo, etc.).

---

## Phase 1: Foundation & Layout
- **Shared layout** with collapsible sidebar (Dashboard, Rental Requests, Properties, Payments, Agencies, Users, Settings at bottom) matching the dark navy/white design from mockups
- **Top navbar** with global search, notification bell, help icon, and admin user avatar
- **Color theme** update: navy blue primary (#1B2559), warm accents (orange for alerts, green for success, red for errors)
- **Reusable components**: StatCard (icon, value, trend %), DataTable with tabs/filters/pagination, StatusBadge, ActionButtons

## Phase 2: Authentication Pages
- **Login page** (`/login`) — email & password form with Ijaar branding, demo credentials hint (admin@ijaar.com / demo123)
- **Register page** (`/register`) — name, email, password, confirm password form
- **Auth guard** — redirects unauthenticated users to login, stores auth state in a simple context/store
- **Logout** functionality from sidebar

## Phase 3: Dashboard Page (`/`)
- 6 stat cards (Total Properties, Pending Listings, Pending Requests, Active Rentals, Total Agencies, Payment Success)
- 2 area charts (Rental Requests Over Time, New Listings Over Time) with weekly data
- Action Queue section with two lists: Pending Rental Requests (Reject/Verify buttons) and Pending Property Approvals (View/Approve buttons)

## Phase 4: Rental Requests Page (`/rental-requests`)
- Stat summary and tabs: All Requests, Pending, Approved, Rejected (with counts)
- Data table: Request ID, User (avatar + name + role), Property (thumbnail + name + specs), Agency, Date, Status
- Select All checkbox, pagination, Export Data button
- **Create Request form page** (`/rental-requests/new`) — fields: user selection, property selection, agency, notes, dates

## Phase 5: Properties Management Page (`/properties`)
- 4 stat cards (Total, Pending Approval, Active, Rejected)
- Tabs: All Properties, Pending Approval, Active, Rejected
- Search bar + Filter, Date Range, Sort controls
- Table: Property (thumbnail + name + ID), Agency (avatar + name), Location, Price (SAR), Type badge, Status, Actions (approve/reject/edit/view)
- **Add Property form page** (`/properties/new`) — fields: name, type (House/Room/Apartment), location (Somali cities), price, bedrooms, bathrooms, agency, description, images upload area

## Phase 6: Payments Tracking Page (`/payments`)
- 3 stat cards (Total Revenue, Pending Amount, Failed Transactions)
- Tabs: All Payments, Paid, Pending, Failed
- Filter & Export buttons
- Table: Payment ID, User (avatar + name + role), Property, Method badge (EVC Plus, Edahab, etc.), Amount, Date, Status

## Phase 7: Agencies Directory Page (`/agencies`)
- 3 stat cards (Total Agencies, Pending Verification, Active Rentals)
- Search bar + Status/Type filter dropdowns
- Table: Agency (avatar + name + ID), Type (Company/Individual), Status (Verified/Pending/Suspended), Listings count, Active Rentals count, Actions (view/verify/suspend)
- **Add Agency form page** (`/agencies/new`) — fields: name, type, contact email, phone, address, city, license number

## Phase 8: Users Management Page (`/users`)
- 2 stat cards (Total Users, Active Rentals) + inline search + status filter
- Table: User (avatar + name + role), Contact Info (email + phone), Joined Date, Rentals count, Status, Actions
- **Add User form page** (`/users/new`) — fields: full name, email, phone (+252 format), role (Landlord/Tenant), city

## Phase 9: Settings Page (`/settings`)
- **Profile** tab: admin name, email, avatar, phone
- **Notifications** tab: email/push notification toggles
- **Platform** tab: platform name, default currency, timezone, language
- **Payments** tab: payment gateway settings, commission rates
- **Appearance** tab: theme toggle (light/dark), sidebar style

---

## Design Principles
- All mock data uses realistic Somali names, cities (Mogadishu, Hargeisa, Kismayo, Bosaso, Galkayo), SAR currency, Somali phone numbers (+252)
- Payment methods: EVC Plus, Edahab, oeeb (Somali mobile money)
- Clean, professional white-background design with navy sidebar
- Consistent spacing, card-based layouts, and table patterns across all pages
