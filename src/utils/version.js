export async function getCurrentVersion() {
  const dataDragonURL = "https://ddragon.leagueoflegends.com/api/versions.json";

  const response = await fetch(dataDragonURL);

  const data = await response.json();

  return data[0];


}
