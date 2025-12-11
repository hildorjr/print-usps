## Quick start

1) Install dependencies: `npm install`
2) Add `EASYPOST_API_KEY` to `.env.local` (server-side only)
3) Run `npm run dev` and open `http://localhost:3000`
4) Fill From/Destination/Parcel fields and submit to get a USPS label
5) Use the download link or inline preview to print

## Assumptions & what I’d do next

- Using EasyPost wallet USPS access; service auto-selects lowest USPS rate for the provided parcel.
- Label is PNG 4x6; parcel units are ounces and inches.
- Next steps: add form reset, add client-side validation, allow service selection and label size formats, surface surcharges/rate details, and persist shipment history with tracking updates.
