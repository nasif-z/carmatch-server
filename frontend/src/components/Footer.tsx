export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-10">
      <aside>
        <p>&copy; {new Date().getFullYear()} CarMatch. All rights reserved.</p>
      </aside>
    </footer>
  );
}
