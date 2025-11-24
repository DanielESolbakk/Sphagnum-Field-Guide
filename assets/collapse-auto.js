/* Auto-collapse headings with collapse markers
 * Usage:
 * Add marker to heading text: `### Habitat { .collapse }`
 * Optional open by default: `### Habitat { .collapse-open }`
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
  // Process headings with collapse markers in text
  const allHeadings=[...document.querySelectorAll('h2, h3, h4, h5, h6')];
  allHeadings.forEach(h=>{
    // Already processed? (in case of reflow)
    if(h.dataset.collapsedProcessed) return;
    
    const text = h.textContent || h.innerText || '';
    const collapseMatch = text.match(/\{\s*\.collapse(-open)?\s*\}$/);
    
    if(!collapseMatch) return; // Skip if no collapse marker
    
    const open = collapseMatch[1] === '-open';
    // Remove the marker from the heading text
    const cleanTitle = text.replace(/\{\s*\.collapse(-open)?\s*\}$/, '').trim();
    
    const details=makeDetails(cleanTitle, open);
    h.dataset.collapsedProcessed='true';
    
    // Move following siblings until next heading of same or higher level OR end
    const level=parseInt(h.tagName.substring(1),10);
    let sib=h.nextElementSibling;
    while(sib){
      if(isHeading(sib)){
        const sibLevel=parseInt(sib.tagName.substring(1),10);
        const sibText = sib.textContent || sib.innerText || '';
        const sibHasCollapse = sibText.match(/\{\s*\.collapse(-open)?\s*\}$/);
        
        if(sibLevel<=level && sibHasCollapse) break;
      }
      const next=sib.nextElementSibling;
      details.appendChild(sib);
      sib=next;
    }
    h.replaceWith(details);
  });
})();