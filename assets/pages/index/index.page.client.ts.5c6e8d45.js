import{a as e}from"../../installSectionUrlHashs.67dc4eae.js";import"../../ScaffoldCallToAction.client.ae800f0f.js";!function(t){e(t.startsWith("https://"));const r=document.createElement("script");r.src=t,r.async=!0,r.setAttribute("charset","utf-8"),document.getElementsByTagName("head")[0].appendChild(r)}("https://platform.twitter.com/widgets.js"),function(){const t=Array.from(document.getElementById("features").querySelectorAll(".feature.has-learn-more"));e(t.length>0),t.forEach((t=>{const r=t.id;e(r.startsWith("feature-"));const c=r.slice("feature-".length);t.onclick=()=>{const t="learn-more-"+c,o=document.getElementById(t);e(o);[...document.querySelectorAll(".learn-more"),...document.querySelectorAll(".feature")].forEach((e=>{e.id!==t&&e.id!==r||e.classList.toggle("selected")}))}}))}();
