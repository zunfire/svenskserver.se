// Live-status via api.mcsrvstat.us (frågas från besökarens webbläsare).
(function () {
  var box = document.getElementById("status");
  if (!box) return;
  var dot = box.querySelector(".status-dot");
  var text = box.querySelector(".status-text");

  fetch("https://api.mcsrvstat.us/3/mc.svenskserver.se")
    .then(function (r) { return r.json(); })
    .then(function (s) {
      if (!s.online) {
        dot.className = "status-dot down";
        text.textContent = "Servern är nere just nu.";
        return;
      }
      dot.className = "status-dot up";
      var p = s.players || {};
      var line = "Servern är uppe · " + (p.online || 0) + " av " + (p.max || 12) + " spelare online";
      if (p.list && p.list.length) {
        line += ": " + p.list.map(function (x) { return x.name; }).join(", ");
      }
      text.textContent = line;
    })
    .catch(function () {
      text.textContent = "Kunde inte hämta status.";
    });
})();
