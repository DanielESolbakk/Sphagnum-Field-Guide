/* Auto-collapse headings with .collapse class
 * Usage:
 * Add a class to a heading: `### Branches { .collapse }`
 * Optional open by default: `### Branches { .collapse-open }`
 * No plugins required (runs client-side after load).
 */
(function(){
  function makeDetails(titleHTML, open){
    const details=document.createElement('details');
    details.className='collapsible';
    if(open) details.setAttribute('open','');
    const summary=document.createElement('summary');
    summary.innerHTML='<span class="collapsible-title">'+titleHTML+'</span><span class="collapsible-indicator" aria-hidden="true"></span>';
    details.appendChild(summary);
    return details;
  }
  function isHeading(el){return /^H[2-6]$/.test(el.tagName);} // skip h1
  // Process heading-based collapses
  const headings=[...document.querySelectorAll('h2.collapse, h3.collapse, h4.collapse, h5.collapse, h6.collapse, h2.collapse-open, h3.collapse-open, h4.collapse-open, h5.collapse-open, h6.collapse-open')];
  headings.forEach(h=>{
    // Already processed? (in case of reflow)
    if(h.dataset.collapsedProcessed) return;
    const open=h.classList.contains('collapse-open');
    const details=makeDetails(h.innerHTML, open);
    h.dataset.collapsedProcessed='true';
    // Move following siblings until next heading of same or higher level with collapse class OR end
    const level=parseInt(h.tagName.substring(1),10);
    let sib=h.nextElementSibling;
    while(sib){
      if(isHeading(sib)){
        const sibLevel=parseInt(sib.tagName.substring(1),10);
        if(sibLevel<=level && (sib.classList.contains('collapse') || sib.classList.contains('collapse-open'))) break;
      }
      const next=sib.nextElementSibling;
      details.appendChild(sib);
      sib=next;
    }
    h.replaceWith(details);
  });
})();