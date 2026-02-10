import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VerificationSubmissionController::store
* @see app/Http/Controllers/VerificationSubmissionController.php:12
* @route '/verification'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VerificationSubmissionController::store
* @see app/Http/Controllers/VerificationSubmissionController.php:12
* @route '/verification'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationSubmissionController::store
* @see app/Http/Controllers/VerificationSubmissionController.php:12
* @route '/verification'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::store
* @see app/Http/Controllers/VerificationSubmissionController.php:12
* @route '/verification'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::store
* @see app/Http/Controllers/VerificationSubmissionController.php:12
* @route '/verification'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
export const success = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/verification/success/{submission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
success.url = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: args.submission,
    }

    return success.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
success.get = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
success.head = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
const successForm = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
successForm.get = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VerificationSubmissionController::success
* @see app/Http/Controllers/VerificationSubmissionController.php:68
* @route '/verification/success/{submission}'
*/
successForm.head = (args: { submission: string | number } | [submission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

success.form = successForm

const VerificationSubmissionController = { store, success }

export default VerificationSubmissionController