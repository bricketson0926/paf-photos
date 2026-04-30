'use client';
import {usePathname, useSearchParams, useRouter} from "next/navigation";

export default function Searchbar() {
    // this component is used to search for a term
    const searchParams = useSearchParams() // get the search params
    const pathname = usePathname(); // get the pathname
    const {replace} = useRouter(); // get the router
    function handleSearch(term: string) {
        // this function handles the search
        const params = new URLSearchParams(searchParams)
        if (term) {// if the term is not empty
            params.set('term', term)
        } else { // if the term is empty
            params.delete('term')
        }
        // replace the url with the new search params
        replace(`${pathname}?${params.toString()}`);
    }

    function handleSort(sortBy: string) {
        // this function handles the sort
        const params = new URLSearchParams(searchParams)
        if (sortBy) {// if the term is not empty
            params.set('sortBy', sortBy)
        } else { // if the term is empty
            params.delete('sortBy')
        }
        // replace the url with the new search params
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        // return the search bar
        <div className="flex flex-col items-center justify-between p-24">
            <p className={"pt-3 text-gray-900 underline"}>Sort By:</p>
            <div className="flex flex-row items-center space-x-2">
                <input type="radio" id="Name" name="searchOption" value="1"
                       onChange={(e) => handleSort(e.target.value)}
                       className="form-radio text-blue-600 h-4 w-4" defaultChecked={true}/>
                <label htmlFor="Name" className="ml-2 text-gray-900">Name</label>
                <input type="radio" id="Address" name="searchOption" value="2"
                       onChange={(e) => handleSort(e.target.value)}
                       className="form-radio text-blue-600 h-4 w-4"/>
                <label htmlFor="Address" className="ml-2 text-gray-900">Address</label>
                <input type="radio" id="PhoneNumber" name="searchOption" value="3"
                       onChange={(e) => handleSort(e.target.value)}
                       className="form-radio text-blue-600 h-4 w-4"/>
                <label htmlFor="PhoneNumber" className="ml-2 text-gray-900">Phone Number</label>
                <input type="radio" id="Category" name="searchOption" value="4"
                       onChange={(e) => handleSort(e.target.value)}
                       className="form-radio text-blue-600 h-4 w-4"/>
                <label htmlFor="Category" className="ml-2 text-gray-900">Category</label>
            </div>
        </div>
    );
}