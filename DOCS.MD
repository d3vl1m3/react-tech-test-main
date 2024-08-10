# Twinkl project

### 1. **Project Overview**
   - **Technologies**:
        - **React**
        - **Jest**: Removed default vitest for this project due to having better familiarity with the Jest API.
        - **SWR**: Manages caching and refetching of data.
   - **Approaches**:
        - **API Agents**: Used to isolate vanilla async calls.
        - **Domain Hooks**: Keeps the context of page functions and async calls close to the code.
        - **Containers**: Separates async calls from components to simplify testing.
        - **Mock and Spy API**: Primarily for mocking third-party hooks and API calls, reducing terminal output during tests.
        - **Single Source of Truth**: The API dictates what should be displayed. Even when deleting, nothing is modified locally, ensuring that the server's state is the source of truth. Optimistic UI updates are an option with SWR for a more responsive application, provided suitable guardrails are in place.

### 2. **Application Features**
   - **Fetching and Displaying Posts**:
     - The container calls the `usePosts` domain hook.
     - `useSWR` calls the relevant API Agent to fetch data.
     - SWR caches the data locally and passes it back to the component for rendering, along with loading and error states.
     - If the user navigates away from the tab or window, the cache is invalidated, and SWR re-fetches the data.
     - At the top of the hook, there is a check for a search parameter in the URL, ensuring the correct list is returned if a link with a search parameter is shared.

   - **Search Functionality**:
     - SWR initially fetches data but cannot be called inside a returned function due to hook rules.
     - The `mutate` function is used to manually invalidate the cache and re-fetch data with a new API agent.
     - This allows the same call to be made with the search parameter added, ensuring the cache is invalidated and the modified API agent is used by the component.
     - No hook rules are broken in this process.

   - **Delete Post Functionality**:
     - The domain hook provides a `delete` action that requires a post ID.
     - A standard request is made, and if successful, `mutate` is called to re-fetch the post list.
     - Local cached data is not modified; the API remains the single source of truth.

### 3. **Code Structure**
   - **Directory Overview**:
     - Pages and components are kept separate.
     - Each component has its own folder, isolating components, containers, tests, styles, and mocks from other areas of the app.
     - This approach avoids over-abstraction in testing, reducing cognitive load and allowing developers to modify files without fear of breaking shared mock objects.

### 4. **Testing**
   - **Test Suite Overview**:
     - Basic TDD approach was used, though BDD is preferred when time allows.
     - Test cases include both "should" and "should not" scenarios, ensuring that both correct behavior and incorrect behavior are tested. This is especially important when triggering form submissions to ensure the API call isn't made if user validation fails.

### 5. **Design Considerations**
   - **Responsiveness**:
     - I've let basic HTML do the heavy lifting here for now. The basic layout is there and I'm content with it for this prototype.
     - Moving forwward, I'd use a combination of something like Headless UI and Tailwind.
   - **User Experience**:
     - To reduce constant re-rendering/fetching when typing, a delay is added to the search function, allowing users to type without repeatedly hitting the API. This reduces server load and improves user experience.
   - **Error Handling**:
     - Error data is prepared in all Domain hooks, though it is not currently displayed in the UI.

### 6. **Future Enhancements**
  - **Potential Improvements**:
    - **Error handling stratergy**
      - Replace thrown errors in the application with typed errors that are passed down, allowing TypeScript to ensure errors are handled correctly at the point of use.
      - Implement a generic error handling strategy in the API Agent to map responses to custom Error classes like `ValidationError`, `ApiError`, and `UnknownError`. Components can then handle these errors as needed.
    - **Typesafety improvemnts**:
      - Consider integrating Zod and React Hook Form for type-safe forms and runtime type validation, ensuring UI/API contract consistency. This approach could reduce the need for extensive E2E and integration testing by leveraging TypeScript and runtime type checking.
    - **Use Headless UI and Tailwind CSS**:
      - Implementing Headless UI and Tailwind CSS would ensure a consistent and highly customizable user interface (UI) and user experience (UX) across the application. 
      - Tailwind CSS would provide utility-first CSS classes for rapid styling, while Headless UI components would offer accessible and unstyled components that could be tailored to fit the application's design system, enhancing both development speed and UI consistency.
    - **UX**:
      - It would be good to allow for the API to allow for searching the body and title for possible matches. I either missed something in the docs or this is simply a limitation on the Placeholder API. Adding a radio button for title or content is possible but felt like a worse UX when updating the API would improve this much more.