# Currency Converter

Currency converter tool built with **React**, **TypeScript**, **Redux**, **Vite**, and **Tailwind CSS**.  
This project demonstrates use of Redux for state management, Vitest and React Testing Library for testing, Tailwind styling, and an API integration.

## Technologies

- **React and TypeScript:** For UI code.
- **Redux:** For global state management.
- **Vite:** For fast development and project setup.
- **Tailwind CSS:** For fast responsive styling.
- **Vitest + Testing Library:** For fast, reliable unit tests.
- **MSW (Mock Service Worker):** For API mocking in tests.

## State Management

- **Redux Toolkit** is used for all global state (amount, base and target currencies, rates, status).
- **currencySlice** is located in `src/features/` (on the advice of Redux documentation although I am not sure if I have fully followed the recommended structure).
- **Selectors** are exported together. The rates state needed to be memoized in CurrencyConverterForm.tsx for performance and to avoid unnecessary re-renders.

## API Integration

- **API call** to floatrates.com is done in `src/api/currencyApi.ts` using fetch.
- **Error handling** is provided, with UI feedback for failed API calls (red banner at top of page).

## Styling

- **Tailwind CSS** is used for all styling.
- **Custom font** Jost is imported from Google Fonts.
- **Color scheme** inspired by the EuroStar website.
- **Select element** has appearance-none to stop grey gradient background showing in Safari. This meant that a custom arrow needed to be added as well (done with CSS).
- **Responsivity** The nature of the design meant that not much needed to be done to make the app responsive but I am using different spacers and font sizes on mobile compared to desktop.

## Testing

- **Vitest** and **React Testing Library** used for unit and integration tests. I created unit tests for all the components I felt needed them but appreciate that there might be some tests missing (such as some keyboard navigation and checking that the correct currency symbol is used on the Amount Input box).
- **MSW** is used to mock API responses. I set this up in handlers.ts and it intercepts API calls done by tests and provides mock data rather than actually calling the API. Mock server is started in `vitest.setup.ts`.
- **Test utilities** are provided in `src/utils/test-utils.ts` for rendering with providers and preloaded state.

## Accessibility

- All form controls use proper labels. ARIA attributes are not needed because the elements have text that describes their actions.
- Keyboard navigation and focus states are styled.
- Color contrast and font sizes are chosen for readability.
- Scores 100 for accessibility on \***\*Lighthouse** and also no issues found by **Accessible web** extension.

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the dev server:**
   ```sh
   npm run dev
   ```
3. **Run tests:**
   ```sh
   npm run test
   ```

## Known Issues & Decisions

- **Base currencies are hard coded:** Because I could not find an endpoint on floatrates that listed available base currencies. If there is one that I am unaware of, perhapes I would utilise it in future to make base currencies dynamic.
- **Safari select styling:** Custom CSS is used to remove background gradient on Safari. Had to add custom arrow for all browsers as a result of appearance-none removing the default arrows.
- **More testing could be done:** I have not created UI tests. This could be done in future using a tool such as Cypress.
- **Tailwind:** I am in the process of learning Tailwind and may not be aware yet of all of its features. I have created some classes that may seem unnecessary because they are only used once but the logic was that they may be used in future if the app were to grow. Some classes are specific to certain components and could probably be stored somewhere more specific than the index.css file.
- **File Structure:** Perhaps could be better organised.

## Final Comments

I believe I have ticked all of the boxes in the brief (including the most of the bonus points). This has been a very interesting task for me, allowing me to deepen my understanding of Redux, testing and Tailwind (all of which I am very keen to improve at). I've aimed to follow best practices throughout and keep it accessible.

Given more time, I would refine the theming, add keyboard navigation tests and perhaps add end-to-end UI tests.
