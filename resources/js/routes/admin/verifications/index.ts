import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/verifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::index
* @see app/Http/Controllers/Admin/VerificationController.php:13
* @route '/admin/verifications'
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
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
export const show = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/verifications/{submission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
show.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { submission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: typeof args.submission === 'object'
        ? args.submission.id
        : args.submission,
    }

    return show.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
show.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
show.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
const showForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
showForm.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::show
* @see app/Http/Controllers/Admin/VerificationController.php:40
* @route '/admin/verifications/{submission}'
*/
showForm.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\VerificationController::review
* @see app/Http/Controllers/Admin/VerificationController.php:103
* @route '/admin/verifications/{submission}/review'
*/
export const review = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

review.definition = {
    methods: ["post"],
    url: '/admin/verifications/{submission}/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::review
* @see app/Http/Controllers/Admin/VerificationController.php:103
* @route '/admin/verifications/{submission}/review'
*/
review.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { submission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: typeof args.submission === 'object'
        ? args.submission.id
        : args.submission,
    }

    return review.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::review
* @see app/Http/Controllers/Admin/VerificationController.php:103
* @route '/admin/verifications/{submission}/review'
*/
review.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::review
* @see app/Http/Controllers/Admin/VerificationController.php:103
* @route '/admin/verifications/{submission}/review'
*/
const reviewForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::review
* @see app/Http/Controllers/Admin/VerificationController.php:103
* @route '/admin/verifications/{submission}/review'
*/
reviewForm.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review.url(args, options),
    method: 'post',
})

review.form = reviewForm

/**
* @see \App\Http\Controllers\Admin\VerificationController::verify
* @see app/Http/Controllers/Admin/VerificationController.php:116
* @route '/admin/verifications/{submission}/verify'
*/
export const verify = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/admin/verifications/{submission}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::verify
* @see app/Http/Controllers/Admin/VerificationController.php:116
* @route '/admin/verifications/{submission}/verify'
*/
verify.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { submission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: typeof args.submission === 'object'
        ? args.submission.id
        : args.submission,
    }

    return verify.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::verify
* @see app/Http/Controllers/Admin/VerificationController.php:116
* @route '/admin/verifications/{submission}/verify'
*/
verify.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::verify
* @see app/Http/Controllers/Admin/VerificationController.php:116
* @route '/admin/verifications/{submission}/verify'
*/
const verifyForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::verify
* @see app/Http/Controllers/Admin/VerificationController.php:116
* @route '/admin/verifications/{submission}/verify'
*/
verifyForm.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, options),
    method: 'post',
})

verify.form = verifyForm

/**
* @see \App\Http\Controllers\Admin\VerificationController::approve
* @see app/Http/Controllers/Admin/VerificationController.php:49
* @route '/admin/verifications/{submission}/approve'
*/
export const approve = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/verifications/{submission}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::approve
* @see app/Http/Controllers/Admin/VerificationController.php:49
* @route '/admin/verifications/{submission}/approve'
*/
approve.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { submission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: typeof args.submission === 'object'
        ? args.submission.id
        : args.submission,
    }

    return approve.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::approve
* @see app/Http/Controllers/Admin/VerificationController.php:49
* @route '/admin/verifications/{submission}/approve'
*/
approve.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::approve
* @see app/Http/Controllers/Admin/VerificationController.php:49
* @route '/admin/verifications/{submission}/approve'
*/
const approveForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::approve
* @see app/Http/Controllers/Admin/VerificationController.php:49
* @route '/admin/verifications/{submission}/approve'
*/
approveForm.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Admin\VerificationController::reject
* @see app/Http/Controllers/Admin/VerificationController.php:72
* @route '/admin/verifications/{submission}/reject'
*/
export const reject = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/verifications/{submission}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VerificationController::reject
* @see app/Http/Controllers/Admin/VerificationController.php:72
* @route '/admin/verifications/{submission}/reject'
*/
reject.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { submission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            submission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        submission: typeof args.submission === 'object'
        ? args.submission.id
        : args.submission,
    }

    return reject.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VerificationController::reject
* @see app/Http/Controllers/Admin/VerificationController.php:72
* @route '/admin/verifications/{submission}/reject'
*/
reject.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::reject
* @see app/Http/Controllers/Admin/VerificationController.php:72
* @route '/admin/verifications/{submission}/reject'
*/
const rejectForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VerificationController::reject
* @see app/Http/Controllers/Admin/VerificationController.php:72
* @route '/admin/verifications/{submission}/reject'
*/
rejectForm.post = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

const verifications = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    review: Object.assign(review, review),
    verify: Object.assign(verify, verify),
    approve: Object.assign(approve, approve),
    reject: Object.assign(reject, reject),
}

export default verifications