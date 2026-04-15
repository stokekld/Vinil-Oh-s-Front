interface FooterProps {
  onAboutClick: () => void;
}

export function Footer({ onAboutClick }: FooterProps) {
  return (
    <footer>
      <div className="footer-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }}>
          About
        </a>
        <a href="https://www.instagram.com/vinilohsclub/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="mailto:hdjesus.flores@gmail.com" target="_blank" rel="noreferrer">
          Soporte
        </a>
      </div>
    </footer>
  );
}
