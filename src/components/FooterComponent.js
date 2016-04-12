import React from 'react';
const FooterComponent = () =>
  <footer>
    <ul>
      <li><a href="/guidelines">Guidelines</a></li>
      <li>|</li>
      <li><a href="/faq">FAQ</a></li>
      <li>|</li>
      <li><a href="Support">Support</a></li>
      <li>|</li>
      <li><a href="/lists">Lists</a></li>
      <li>|</li>
      <li><a href="/bookmarklet">Bookmarklet</a></li>
      <li>|</li>
      <li><a href="/DMCA">DMCA</a></li>
      <li>|</li>
      <li><a href="#">R Combinator</a></li>
      <li>|</li>
      <li><a href="/apply">Apply</a></li>
      <li>|</li>
      <li><a href="/Contact">Contact</a></li>
    </ul>
    <form method="get" action="https://hn.algolia.com/">Search: <input type="text" name="q" size="17" /></form>
  </footer>;

export default FooterComponent;
