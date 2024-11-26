export function Home(): React.ReactElement {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <div className="p-5 text-center">
      <h1>Welcome {currentUser}!</h1>
    </div>
  );
}
