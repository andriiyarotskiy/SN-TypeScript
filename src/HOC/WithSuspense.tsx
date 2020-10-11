import React, {Suspense} from "react"
import {Preloader} from "../components/common/preloader/Preloader";

export const WithSuspense = (Component: React.ComponentType) => {
    return (props: any) => {
        return <Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </Suspense>
    }
}