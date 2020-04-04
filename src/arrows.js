const downArrow = color => {
    return `
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-down color-${color}" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>
    <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
  </svg>
  `;
}

const upArrow = color => {
    return `
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-up color-${color}" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>
    <path d="M18 15l-6-6l-6 6h12" />
  </svg>
  `;
}

const format = num => new Intl.NumberFormat().format(num)

export const getArrowText = (prev, now, paranthesis = false, positive = false) => {
    const change = now - prev;
    let text = '';
    if (change > 0) {
        const color = positive ? 'green' : 'red';
        text = `${upArrow(color)} ${format(change)}`
    } else if (change < 0) {
        const color = positive ? 'red' : 'green';
        text = `${downArrow(color)} ${format(Math.abs(change))}`
    }
    if(paranthesis && text){
        text = `(${text})`;
    }
    return text;
}