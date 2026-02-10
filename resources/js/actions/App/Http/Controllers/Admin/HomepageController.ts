import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/homepage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::edit
* @see app/Http/Controllers/Admin/HomepageController.php:14
* @route '/admin/homepage'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\HomepageController::update
* @see app/Http/Controllers/Admin/HomepageController.php:23
* @route '/admin/homepage'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/homepage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HomepageController::update
* @see app/Http/Controllers/Admin/HomepageController.php:23
* @route '/admin/homepage'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomepageController::update
* @see app/Http/Controllers/Admin/HomepageController.php:23
* @route '/admin/homepage'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::update
* @see app/Http/Controllers/Admin/HomepageController.php:23
* @route '/admin/homepage'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomepageController::update
* @see app/Http/Controllers/Admin/HomepageController.php:23
* @route '/admin/homepage'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const HomepageController = { edit, update }

export default HomepageController