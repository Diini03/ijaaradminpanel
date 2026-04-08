

# Ijaar Admin Panel — Data Model Update & Detail Views

## What We're Building

Based on the provided data models and UI mockups, we need to:

1. **Update all mock data interfaces and records** to match the real app models (adding missing fields like `description`, `sqft`, `rentalDuration`, `amenities`, `houseRules`, `owner`, etc.)
2. **Add detail view pages/dialogs** for Properties and Users (clickable rows that open rich detail views as shown in the mockups)
3. **Update forms** to match the real model fields
4. **Add new data types** for Owner, PaymentMethod, Transaction, Invoice, Notification

---

## Phase 1: Update Data Models & Mock Data

Update `src/data/mockData.ts` with all new interfaces and extended mock records:

- **User**: Add `password` (omitted in display), `level`, `profileImage`, `otp` fields
- **Property**: Add `description`, `sqft`, `rentalDuration` (monthly/3monthly/year), `amenities` array, `houseRules` object, `ownerId`, `images` array (multiple), `rate`
- **Owner**: New interface — `fullName`, `phone`, `address`, `email`, `accountNumber`
- **Agency**: Add `description`, `locations`, `level`, `totalProperties`, `totalActive`, `totalAvailable`, `rate`
- **Payment**: Add `propertyId`, `houseRulesId`, `currency`, `paymentMethodId`, `invoiceId`, `referenceNumber`
- **PaymentMethod**: New interface — `name`, `serviceProvider`, `active`
- **Transaction**: New interface — `paymentId`, `userId`, `propertyId`, `type` (rent/deposit), `date`, `state`, `paymentMethodId`
- **Invoice**: New interface — `userId`, `transactionId`, `paymentId`, `transactionDate`, `paymentStatus`
- **Notification**: New interface — `userId`, `title`, `message`, `type`, `isRead`, `sentAt`

Add mock data for Owners, PaymentMethods, Transactions, Invoices, and Notifications with Somali-relevant details.

## Phase 2: Property Detail Page

Create `src/pages/PropertyDetail.tsx` at route `/properties/:id` — matching the uploaded mockup (Body.png):

- **Header**: Property name + status badge + ID + location
- **Image gallery**: Main image + side thumbnails from the `images` array
- **Info cards row**: Price/mo, Type (with icon), Size (sqft)
- **About section**: Property description text
- **Listed By sidebar**: Owner/Agency avatar, name, agency name, verified badge, "View Agency Profile" link
- **Amenities**: Tag chips (WiFi, AC, Pool, Gym, etc.)
- **House Rules**: Icon + text list with active/inactive states
- **Action buttons**: Reject / Approve Property (for pending ones)

Wire the "View" button on Properties table rows to navigate to `/properties/:id`.

## Phase 3: User Detail Dialog

Create `src/components/UserDetailDialog.tsx` — matching the uploaded mockup (Body-7.png):

- **Modal/dialog overlay** (not a separate page — the mockup shows it as a modal)
- **Header**: "User Details" + "Viewing profile for ID #..."
- **Profile section**: Avatar with online indicator, name, status badge, joined date, city, Edit/Reset buttons
- **Contact Information card**: Email (with copy icon), Phone (with copy icon)
- **Rental Summary card**: Current Properties count, Total Spent (SAR), Last Payment date with status
- **ID Verification Documents section**: Verification status badge + placeholder document area
- **Footer**: Close button + "Edit Profile" navy button

Wire the "View" (Eye) button on Users table rows to open this dialog.

## Phase 4: Update Property Form

Update `src/pages/NewProperty.tsx` to include all real model fields:

- Add: `description` (textarea), `sqft` (number), `rentalDuration` (select: Monthly/3 Months/Yearly), `rate` (number)
- Add: **Amenities** section — checkbox grid (WiFi, AC, Pool, Gym, Parking, TV, Kitchen, Laundry)
- Add: **House Rules** section — dynamic list with text input + toggle for active/inactive
- Add: **Owner** selection dropdown (from mock owners)
- Update images section to support multiple image slots

## Phase 5: Update Agency Form & Detail

Update `src/pages/NewAgency.tsx` with new fields: `description`, `locations` (multi-input), `level`, `rate`.

## Phase 6: Wire Routes & Navigation

- Add route `/properties/:id` to `App.tsx`
- Make property table rows clickable (navigate on click or via View button)
- Make user table View button open the UserDetailDialog
- Make payment rows show basic detail (payment ID, reference number, invoice link)

---

## Technical Details

- All new routes added to `App.tsx` Routes config
- Property detail uses `useParams` to find the property from mock data
- User detail uses a Dialog component (shadcn `Dialog`) triggered by clicking the Eye icon
- Currency displayed as **SAR** throughout (matching the mockup)
- Copy-to-clipboard for email/phone uses `navigator.clipboard.writeText`
- All new components follow existing patterns (Tailwind classes, shadcn/ui components)

**Files to create**: `PropertyDetail.tsx`, `UserDetailDialog.tsx`
**Files to update**: `mockData.ts`, `App.tsx`, `Properties.tsx`, `UsersPage.tsx`, `NewProperty.tsx`, `NewAgency.tsx`

