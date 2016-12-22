(function() {
    const buttons = document.querySelectorAll(".panel-button");
    const panels = document.querySelectorAll(".panel");

    buttons.forEach(button => button.addEventListener('click', changePanel));

    function changePanel(e) {
        const requestedPanel = this.dataset.chart;
        document.querySelector(".panel.active").classList.remove('active');
        document.querySelector(".panel-button.active").classList.remove('active');
        this.classList.add('active');
        document.querySelector(`div[data-chart="${requestedPanel}"]`).classList.add("active");
    }
})();
