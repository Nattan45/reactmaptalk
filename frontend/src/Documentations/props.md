# Props using Tracker.jsx

```
Tracker.jsx
│
├── TrackParameters.jsx <-- Can call `onTripSelect` to update state in MainParent
│
└── ActiveVehicleDetails.jsx <-- Receives `tripId` and `tripData` as props from MainParent
```

##

### 1. Setting Up the Parent and Child Relationship

Think of the **parent component** as a big container where information is stored. Inside this container, you have smaller boxes (the child components) that perform specific tasks. The parent controls these boxes, giving them instructions and waiting for them to send back information.

In your case:

- The **parent** is managing some information about "trips."
- It has two **child components**:
  - **`TrackParameters`**: This child is responsible for showing a list of trips. It has a button to "View" the details of each trip.
  - **`ActiveVehicleDetails`**: This child displays the details of the selected trip that you clicked "View" on.

### 2. Passing a Function from Parent to Child (`onTripSelect`)

Here’s the fun part:

- The parent gives the `TrackParameters` child a **special function** called `handleTripSelect` by passing it as a prop called `onTripSelect`.
- Imagine the parent saying, “Hey `TrackParameters`, here’s a special envelope (`onTripSelect`) you can use to send me the trip details when someone clicks ‘View’ on a trip.”

In the parent code:

```javascript
<TrackParameters onTripSelect={handleTripSelect} />
```

This is like giving the child a mailbox labeled `onTripSelect` to send trip info back to the parent.

### 3. The Child Component Uses the Function to Pass Data Back

In the `TrackParameters` component, you’ve created a small function called `handleViewClick`. This function is like a little messenger that runs when the "View" button is clicked on a trip.

Here’s what happens:

- When the user clicks "View" on a trip, `handleViewClick` grabs the trip’s ID and data.
- Then, it puts that info in the special envelope (using `onTripSelect(trip.id, tripData);`) and sends it back to the parent.

```javascript
const handleViewClick = (trip) => {
  onTripSelect(trip.id, tripData); // Sends trip info back to the parent
};
```

### 4. Parent Receives the Data and Saves It

Now the parent gets the data from `TrackParameters` and says, “Great! I’ll keep this info safe.”

- The parent uses two `set` functions, `setSelectedTripId` and `setTripData`, to store the trip’s ID and data in its memory (also called **state**).

```javascript
const handleTripSelect = (id, data) => {
  setSelectedTripId(id); // Save the selected trip's ID
  setTripData(data); // Save the selected trip's full data
};
```

Now, the parent has stored the trip’s details!

### 5. The Parent Passes the Data to Another Child (`ActiveVehicleDetails`)

Finally, the parent shares this saved information with the second child, `ActiveVehicleDetails`, by giving it the stored `selectedTripId` and `tripData`.

```javascript
<ActiveVehicleDetails tripId={selectedTripId} tripData={tripData} />
```

Now, `ActiveVehicleDetails` can see the trip ID and data that the parent stored, and it can use that info to display the details to the user.

### Summary:

1. **Parent gives** `TrackParameters` **a mailbox** (the `onTripSelect` prop).
2. **`TrackParameters` uses** that mailbox to send **trip info back to the parent** when "View" is clicked.
3. **Parent stores** the trip info in its memory using `setSelectedTripId` and `setTripData`.
4. **Parent shares** this stored info with `ActiveVehicleDetails`, so it can display the details of the selected trip.

### Example Recap

Imagine it like this:

- Parent says to `TrackParameters`: “If you get a trip ID and data, put it in the mailbox (using `onTripSelect`) and send it back to me.”
- `TrackParameters` says: “Okay! I’ll use this mailbox when the user clicks ‘View’ on a trip.”
- Parent gets the info and says: “Thank you! I’ll keep this safe, and now I’ll give this info to `ActiveVehicleDetails` so it can show the details.”

This process lets the parent **coordinate** between its two children, so when you click "View" in `TrackParameters`, the details appear in `ActiveVehicleDetails`.

##

### What Are Props in React?

Props (short for "properties") are **like packages of data** that a parent component can give to its children. They allow the parent to pass information **downward** to child components. This is how we can **control** and **share data** between components in a React app.

In your example:

- The **parent component** (like `Tracker.js`) has some data and functionality it wants to share.
- It passes these as **props** to its child components (`TrackParameters` and `ActiveVehicleDetails`), allowing them to access that information and take action when necessary.

### Key Points about Props

1. **One-Way Data Flow**:

   - Props in React flow **from parent to child** only. This is why we call it a "one-way data flow."
   - Child components can **use** the props but cannot change them directly; they can only **send information back** to the parent (like in your case with `onTripSelect`).

2. **Props as Function Arguments**:

   - Think of props as **arguments** you pass into a function. When you define a component, you can "catch" these props as parameters in your function:
     ```javascript
     const TrackParameters = ({ onTripSelect }) => {
       // Now, onTripSelect is available in this component
     };
     ```

3. **Passing Functions as Props**:

   - Props are **not limited to just data** (like numbers or strings); you can also pass **functions** as props.
   - This is how the child component can **notify** the parent about an event (e.g., the user clicked "View").
   - In your example, `onTripSelect` is a function passed down as a prop, allowing `TrackParameters` to **communicate** with its parent by "calling" the function with specific data.

4. **Reusing Components**:
   - Props allow components to be more **reusable**. You can pass different props to a component each time you use it, so it can show different data or behave differently.
   - For example, if you had a list of trips, you could use `TrackParameters` multiple times for different trips, each with its own `onTripSelect` prop, and each time it would behave according to the data it receives.

### How Props Work in Your Code

Let’s walk through the flow in your code, focusing on how props are used:

1. **Parent Passes `onTripSelect`**:

   - The parent (like `Tracker.js`) wants to know when a trip is selected, so it **creates a function** (`handleTripSelect`) that will handle this task.
   - The parent then **passes this function** as a prop called `onTripSelect` to `TrackParameters`.
   - Now, `TrackParameters` has access to `onTripSelect` and can use it to send information back to the parent.

2. **Child Uses `onTripSelect` to Send Data**:

   - Inside `TrackParameters`, the `handleViewClick` function is set up to **call** `onTripSelect` whenever a trip is clicked.
   - When `handleViewClick` is called, it uses `onTripSelect(trip.id, tripData);` to send the selected trip’s ID and data **up to the parent**.

3. **Parent Receives Data and Passes It to Another Child**:
   - The parent receives the data through `handleTripSelect`, **stores it in state**, and then passes this state as props to `ActiveVehicleDetails`.
   - This allows `ActiveVehicleDetails` to access the selected trip's ID and data, which it can use to display details for the user.

### In Summary

- **Props** allow the parent to send data and functions to its children.
- **One-way data flow** keeps data organized, flowing from parent to child.
- **Functions as props** let children communicate events back up to their parents.

This **parent-child communication using props** is a fundamental concept in React, and it helps you structure your app in a modular and organized way. You're already using props effectively here!

##

so the parent component Tracker.jsx can send it to another component that are on the same level as it is but they have different parents like dom-x-y-z-Tracker.jsx and dom -a-b-c-Reuse.jsx

##

In your case, if `Tracker.jsx` and `Reuse.jsx` both need access to the same data, you can use a **higher-level parent component** to manage that data and then pass it down as props to both `Tracker.jsx` and `Reuse.jsx`.

### How It Works

Here's a step-by-step guide on how to share data between sibling components like `Tracker.jsx` and `Reuse.jsx`:

1. **Identify a Common Parent**:

   - Find a component that is **above both Tracker.jsx and Reuse.jsx** in the component tree. Let’s call it `MainParent.jsx`.
   - `MainParent.jsx` will be responsible for managing the shared data.

2. **Store Data and Functions in the Common Parent (MainParent.jsx)**:

   - Define the shared **state** and any functions to handle that data in `MainParent.jsx`.
   - For example, if `MainParent.jsx` needs to keep track of the selected trip ID and data, you can define this state and function in `MainParent.jsx`:

     ```javascript
     const [selectedTripId, setSelectedTripId] = useState(null);
     const [tripData, setTripData] = useState(null);

     const handleTripSelect = (id, data) => {
       setSelectedTripId(id);
       setTripData(data);
     };
     ```

3. **Pass the Data and Functions Down as Props**:

   - Pass `handleTripSelect`, `selectedTripId`, and `tripData` down to both `Tracker.jsx` and `Reuse.jsx` as props.
   - This way, `Tracker.jsx` can use `handleTripSelect` to update the trip data, and `Reuse.jsx` can use `selectedTripId` and `tripData` to access and display that data.

   Here’s an example of how `MainParent.jsx` might render `Tracker.jsx` and `Reuse.jsx`:

   ```javascript
   <Tracker onTripSelect={handleTripSelect} />
   <Reuse tripId={selectedTripId} tripData={tripData} />
   ```

4. **Using the Shared Data in `Tracker.jsx` and `Reuse.jsx`**:
   - `Tracker.jsx` can now call `onTripSelect` when a trip is selected, which will update the state in `MainParent.jsx`.
   - `Reuse.jsx`, which receives `tripId` and `tripData` as props, will automatically re-render and show the updated data.

### Visual Example

Imagine the component hierarchy like this:

```
MainParent.jsx
│
├── Tracker.jsx      <-- Can call `onTripSelect` to update state in MainParent
│
└── Reuse.jsx        <-- Receives `tripId` and `tripData` as props from MainParent
```

By managing the state in `MainParent.jsx`, both `Tracker.jsx` and `Reuse.jsx` have access to the data they need, even though they aren’t directly connected to each other.

### In Summary

- **MainParent.jsx** acts as the central hub, storing data and passing it to both `Tracker.jsx` and `Reuse.jsx`.
- Both components can use or update the shared data through props, allowing them to stay in sync.

This approach is **common in React apps** for sharing data between sibling components. It keeps the data centralized and makes it easy to control how the components interact with each other.
