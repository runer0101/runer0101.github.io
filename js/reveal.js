// Sections fade in once they enter the viewport. The hiding rule lives under
// `.js` in the stylesheet, so a page without JavaScript stays readable.
export function initReveal() {
    const elements = document.querySelectorAll(".reveal, .reveal-children");
    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("visible");
                    observer.unobserve(entries[i].target);
                }
            }
        },
        { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
}
