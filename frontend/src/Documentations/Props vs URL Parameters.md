# Props vs URL Parameters

This structure helps show the roles of **URL parameters** and **data sharing** in an application with routes and components.

```
 URL Parameters between Components and Browser Data Rendering
│
├── App.js <-- Defines and stores the routes for different pages
│
├── OngoingTrip.jsx <-- Lists items and navigates to a specific ProblemDetails page when a problem is selected
│
└── ProblemDetails.jsx <-- Uses URL parameters to render data for a specific problem based on the ID in the URL
```

---

### 1. **Props**: Think of props as a way to hand over data from one place (like a parent component) to another place (a child component).

#### Imagine:

Let’s say you have a superhero team, and each superhero needs a **special tool** to do their job. You, as the team leader (parent component), give each hero (child component) their tool.

- If you give **Iron Man** a suit, you’re saying: "Here, Iron Man, this is your tool."
- If you give **Thor** a hammer, you’re saying: "Here, Thor, this is your tool."

This **handing over** is like **props** in React: you're giving information (like a suit or hammer) from the parent to the child.

So, in code, if we have a hero and want to give them a name as a **prop**, it looks like this:

```jsx
<Hero name="Iron Man" tool="Suit" />
<Hero name="Thor" tool="Hammer" />
```

Here, `name` and `tool` are **props** we’re handing over to each **Hero**. Each child component (like `Hero`) can then use the prop values in their display.

---

### 2. **URL Parameters**: These are part of the URL, or web address, and they help decide **which specific thing** to show on a page.

#### Imagine:

Imagine you’re running a big library with lots of storybooks. Each book has a special **ID number** that helps readers find the exact book they want. When a reader asks for a book by its **ID**, you use that **ID** to find the correct book.

This **ID in the URL** is like a **URL parameter**. It tells us which book (or problem or user) to show when they visit that page.

In the case of `App.js`, when we define a path like this:

```jsx
<Route path="/problem/:id" element={<ProblemDetails />} />
```

the `:id` means any **ID number** will work here, like `/problem/123` or `/problem/456`, depending on which specific "problem" someone wants to see.

#### Back to the Example with `ProblemDetails`:

1. In `OngoingTrip`, if someone clicks on a button that navigates to `/problem/123`, we go to the page `/problem/123`.
2. In the `ProblemDetails` component, React Router reads the **URL parameter** (`id`) and displays the details for that specific problem (e.g., problem 123).

To access the `id`, we use:

```jsx
const { id } = useParams(); // Gets the ID (like 123) from the URL
```

This allows `ProblemDetails` to display the specific information tied to `id` from the URL, such as problem 123’s details.

---

### More Examples of URL Parameters

#### Example 1: Product Page

Let’s say we’re building an online store, and each product has a unique ID.

1. **Route Definition** in `App.js`:
   ```jsx
   <Route path="/product/:id" element={<ProductDetails />} />
   ```
2. **Navigation**:
   If a customer clicks on a link for a product with ID 789, we go to `/product/789`.
3. **Using `useParams` in ProductDetails**:
   ```jsx
   const { id } = useParams();
   // Now id is "789", so we show details for product 789
   ```

#### Example 2: Profile Page

Imagine we have a social app with profiles for each user.

1. **Route Definition**:
   ```jsx
   <Route path="/user/:userId" element={<UserProfile />} />
   ```
2. **Navigation**:
   If someone wants to view the profile for user with ID `42`, they’ll go to `/user/42`.
3. **Using `useParams` in UserProfile**:
   ```jsx
   const { userId } = useParams();
   // Now userId is "42", so we show details for user 42
   ```

In each case, the **URL parameter** tells us _which exact item_ to load, and we use `useParams()` to read it in the component that needs it.

---

### In Summary:

- **Props**: Think of these as tools or data passed from a parent to a child, used to customize what the child shows or does.
- **URL Parameters**: Like IDs in the URL, used to show specific details about an item (like a problem, product, or user) based on the URL itself.
