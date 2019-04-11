function apiRequest(type, path, data)
{
    return $.ajax({
        type: 'get',
        url: '/proxy.php?requestType=' + type + "&path=" + path + "&body=" + $.param(data),
        dataType: 'json',
        cache: false,
        async: true
    });
}