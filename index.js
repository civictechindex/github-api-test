(function ($) {
    var searchTopic = function (topic, callback) {
        console.log("Searching repos matching topic: " + topic);

        $.ajax("https://api.github.com/search/repositories?q=topic:" + topic + "&sort=updated&order=desc", {
            headers: {
                "Accept": "application/vnd.github.mercy-preview+json",
                "User-Agent": "HackForLA"
            }
        }).done(callback);
    };

    $(function () {
        var repos_list = $(".repos");
        var repo_tmpl = $("#repo-tmpl");
        var topic = $("#topic");
        var search = $("#search");
        var reset = $("#reset");

        $(".dropdown-item, #code-for-america").click(function() {
            topic.val($(this).data("q"));
            search.click();
        });

        search.click(function () {
            if (topic.val() !== "") {
                searchTopic(topic.val(), handleResponse);
            }
        });

        reset.click(function () {
            topic.val("");
            repos_list.empty();
        });

        var handleResponse = function (data) {
            console.log(data);

            repos_list.empty();
            var len = 0;

            $.each(data.items, function (_, repo_data) {
                var repo_card = $(repo_tmpl.html());

                $(".name", repo_card).text(repo_data.name);
                $(".description", repo_card).text(repo_data.description);
                $(".topics", repo_card).text(repo_data.topics.join(", "));
                $("a.repo", repo_card).attr("href", repo_data.html_url);
                $("a.issues", repo_card).attr("href", repo_data.html_url + "/issues?q=is%3Aopen");
                $("a.issues .badge", repo_card).text(repo_data.open_issues);

                if (repo_data.homepage) {
                    $("a.homepage", repo_card).attr("href", repo_data.homepage);
                }
                else {
                    $("a.homepage", repo_card).remove();
                }

                $(".updated small", repo_card).text(repo_data.updated_at);

                $.ajax(repo_data.languages_url, {
                    headers: {
                        "User-Agent": "HackForLA"
                    }
                }).done(function (lang_data) {
                    var langs = $.map(lang_data, function (v, k) { return k; });
                    langs.sort(function (a, b) {
                        if (lang_data[a] < lang_data[b]) {
                            return 1;
                        }
                        if (lang_data[a] > lang_data[b]) {
                            return -1;
                        }
                        return 0;
                    });

                    $(".lang", repo_card).text(langs.join(", "));
                });

                len++;
                repos_list.append(repo_card);
            });

            var listings = len == 1 ? "listing" : "listings";
            listings = len + " " + listings;

            repos_list.prepend("<h2>" + listings + "</h2>");
        };
    });
})(jQuery);
