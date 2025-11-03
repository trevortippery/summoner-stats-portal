export function calculateKDA(kills, deaths, assists) {
  let matchKDA = 0;

  if (deaths === 0) {
    matchKDA = ((kills + assists) / 1).toFixed(2);
  } else {
    matchKDA = ((kills + assists) / deaths).toFixed(2);
  }

  return `${matchKDA} KDA`;
}

export function calculateCS(gameDuration, totalMinions) {
  const time = gameDuration / 60;

  const csPerMinute = (totalMinions / time).toFixed(1);

  return `CS ${totalMinions} (${csPerMinute})`;
}
