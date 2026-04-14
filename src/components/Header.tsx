interface HeaderProps {
  // Props can be added here if needed
}

export function Header({}: HeaderProps) {
  return (
    <header>
      <div className="header-top">
        <div className="logo">
          VINIL<br />
          OH'S<br />
          CLUB
        </div>
      </div>
    </header>
  );
}
