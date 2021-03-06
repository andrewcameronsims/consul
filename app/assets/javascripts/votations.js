(function() {
  "use strict";
  App.Votations = {
    checkMaxVotes: function() {
      if ($("#votation_type_enum_type").val() === "0") {
        $(".js-max_votes").hide();
        $("#max_votes").attr({ disabled: true });
      } else {
        $(".js-max_votes").show();
        $("#max_votes").attr({ disabled: false });
      }
    },
    checkPrioritization: function() {
      if ($("#votation_type_enum_type").val() === "2") {
        $(".js-prioritization_type").show();
        $("#prioritization_type").attr({ disabled: false });
      } else {
        $(".js-prioritization_type").hide();
        $("#prioritization_type").attr({ disabled: true });
      }
    },
    checkMaxGroups: function() {
      if ($("#votation_type_enum_type").val() === "7" || $("#votation_type_enum_type").val() === "8") {
        $(".js-max_group_votes").show();
        $("#max_groups_answers").attr({ disabled: false });
      } else {
        $(".js-max_group_votes").hide();
        $("#max_groups_answers").attr({ disabled: true });
      }
    },
    setTraduction: function(response) {
      $(".js-description_text").text(response.traduction);
    },
    updateChecks: function() {
      App.Votations.checkMaxVotes();
      App.Votations.checkPrioritization();
      App.Votations.checkMaxGroups();
    },
    initialize: function() {
      App.Votations.updateChecks();
      $("#votation_type_enum_type").on({
        change: function() {
          var params, url;
          App.Votations.updateChecks();
          url = "/admin/get_options_traductions.json";
          params = {
            enum_type: $("#votation_type_enum_type").val()
          };
          $.get(url, params, function(response) {
            App.Votations.setTraduction(response, "json");
          });
        }
      });
    }
  };
}).call(this);
