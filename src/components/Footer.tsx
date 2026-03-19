interface FooterProps {
  onAboutClick: () => void;
  onSupportClick: () => void;
}

export function Footer({ onAboutClick, onSupportClick }: FooterProps) {
  return (
    <footer>
      <div>© 2024 Vinil Oh's Club — Listening Sessions</div>
      <div className="footer-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }}>
          About Club
        </a>
        <a href="https://www.instagram.com/vinilohsclub/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onSupportClick(); }}>
          Support
        </a>
      </div>
    </footer>
  );
}
