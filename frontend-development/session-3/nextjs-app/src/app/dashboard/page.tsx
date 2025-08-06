import './style.css';

function Dashboard() {
  return (
    <div>
      {/* external css styling */}
      <h1 className="heading">this is dashboard</h1>

      {/* inline styling */}
      <h2 style={{ color: 'green', fontSize: 20 }}>sections</h2>

      {/* tailwind */}
      <h2 className="text-amber-400 font-bold p-2 mt-2">sections</h2>
    </div>
  );
}

export default Dashboard;
