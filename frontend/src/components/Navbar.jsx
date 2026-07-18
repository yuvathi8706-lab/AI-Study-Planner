function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <svg
          className="brand-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ verticalAlign: 'middle', marginRight: '8px' }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span>AI Study Planner</span>
      </div>
      <div className="nav-user">
        <div className="avatar">S</div>
      </div>
    </header>
  );
}

export default Navbar;