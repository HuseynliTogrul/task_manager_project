export function Home(): React.ReactElement {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <div className="p-5 text-center">
      {currentUser ? (
        <h1>Welcome {currentUser}!</h1>
      ) : (
        <h1>Home</h1>
      )}
    </div>
  );
}
