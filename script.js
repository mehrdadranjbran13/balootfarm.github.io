function faToEn(str) {
  if (!str) return "";
  return str.toString().replace(/[۰-۹]/g, function(d) {
    return "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
  }).replace(/[٠-٩]/g, function(d) {
    return "٠١٢٣٤٥٦٧٨٩".indexOf(d);
  });
}

function getWhatsNumber(title) {
  if (title.indexOf("گوساله") !== -1) return "989123175163";
  if (title.indexOf("همکاری") !== -1) return "989358218321";
  return "989123359849";
}

function getLabel(el) {
  var lab = el.closest("label");
  if (lab) {
    var clone = lab.cloneNode(true);
    var f = clone.querySelector("input,textarea,select");
    if (f) f.remove();
    var t = clone.textContent.trim().replace(":", "");
    if (t) return t;
  }
  return el.placeholder || el.name || "مورد";
}

function orderMsg(e, title) {
  e.preventDefault();
  var form = e.target;
  var fields = form.querySelectorAll("input, textarea, select");
  var lines = [];
  var mobile = "";

  fields.forEach(function(el) {
    var val = el.value.trim();
    if (!val) return;
    var norm = faToEn(val).trim();
    if (/^09\d{9}$/.test(norm)) {
      mobile = norm;
    }
    lines.push("▪ " + getLabel(el) + ": " + val);
  });

  var msgBox = form.querySelector("#ok, .ok");
  if (!mobile) {
    if (msgBox) {
      msgBox.style.color = "red";
      msgBox.textContent = "لطفا شماره موبایل را درست وارد کنید (مثل 09123359849).";
    }
    return false;
  }
  if (msgBox) msgBox.style.color = "";

  var text = "سلام دامداری شیری بلوط \uD83C\uDF33\n";
  text += "درخواست جدید: " + title + "\n";
  text += "----------------\n";
  text += lines.join("\n");

  var number = getWhatsNumber(title || "");
  var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");

  if (msgBox) {
    msgBox.innerHTML = "✅ درخواست " + title + " شما آماده شد و واتس‌اپ باز شد. اگر باز نشد <a href='" + url + "' target='_blank' style='color:#1c4d2e;font-weight:900'>اینجا کلیک کنید</a>. برادران رنجبران به‌زودی تماس می‌گیرند.";
  }
  form.reset();
  return false;
}

document.addEventListener("click", function(e) {
  var nav = document.getElementById("nav");
  if (nav && nav.classList.contains("open")) {
    if (!e.target.closest(".header")) nav.classList.remove("open");
  }
});
