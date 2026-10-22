$(document).ready(function() {
  // Initialize DataTables
  $('table').DataTable({
    responsive: true,
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50, 100]
  });

  // Form validation
  $('form').on('submit', function(e) {
    if (!$(this).valid()) {
      e.preventDefault();
    }
  });
});