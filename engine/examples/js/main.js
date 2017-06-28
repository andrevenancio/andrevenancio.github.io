var nav = document.getElementById('nav');
var iframe = document.getElementById('iframe');
var data = [], current = '_default';

init();

function init() {
    for (var key in examples) {
        if (key !== current) {
            var element = document.createElement('h2');
            element.innerHTML = key;
            nav.appendChild(element);
        }

        for (var i = 0; i < examples[key].length; i++) {
            element = document.createElement('a');
            element.href = '#';
            element.innerHTML = examples[key][i].title;
            nav.appendChild(element);

            addListener(element, examples[key][i]);
        }
    }

    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange();
}

function addListener(element, info) {
    data.push({
        element: element,
        info: info,
    });
    var id = data.length - 1;
    element.addEventListener('click', function(e) { e.preventDefault(); handleClick(id); }, false);
}

function handleClick(index) {
    changeSource('');
     window.location.hash = '#' + data[index].info.title;
}

function handleHashChange() {
    var hash = window.location.hash.replace('#', '');
    if (hash === '') {
        // TODO: unload iframe?
        changeSource('');
        return;
    }

    for (var i = 0; i < data.length; i++) {
        var current = data[i].info;
        if (hash === current.title) {
            data[i].element.className = 'selected';
            var url = `//codepen.io/andrevenancio/embed/${current.pen}/?theme-id=30219&embed-version=2&editable=true`
            changeSource(url);
        } else {
            data[i].element.className = '';
        }
    }
}

function changeSource(path) {
    iframe.src = path;
}
