import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/user/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::user
* @see app/Http/Controllers/DashboardController.php:32
* @route '/user/dashboard'
*/
userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
export const reviewer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewer.url(options),
    method: 'get',
})

reviewer.definition = {
    methods: ["get","head"],
    url: '/reviewer/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
reviewer.url = (options?: RouteQueryOptions) => {
    return reviewer.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
reviewer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewer.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
reviewer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviewer.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
const reviewerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
reviewerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::reviewer
* @see app/Http/Controllers/DashboardController.php:49
* @route '/reviewer/dashboard'
*/
reviewerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reviewer.form = reviewerForm

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
const adminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
adminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::admin
* @see app/Http/Controllers/DashboardController.php:64
* @route '/admin/dashboard'
*/
adminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

admin.form = adminForm

const DashboardController = { index, user, reviewer, admin }

export default DashboardController