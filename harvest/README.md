#[dre-reaction-dictionary-warmer]

## What is the for?
After a fresh install of the **DRE APIs**, the **reaction** dictionary is empty.  

While a client (such as the **DRE APP**) can send a POST to the `/reactions` endpoint for a given term to force the population of the dictionary, this script was built to help force the pre-loading of the reactions dictionary based upon the unique reactions we know are present in the [OpenFDA drug/events](https://open.fda.gov/drug/event/) dataset.

## How does it work and what are the requirements to run?

This is a stand alone node [node.js](https://nodejs.org/) CLI (command line interface) script and must be run from a machine that has node running, but does NOT necessarily have to be run from the server / container you have DRE running.

**The script goes thru the following steps:**

- Builds a list of query URLs for OpenFDA `drug/event` resources
- Makes an initial call to the endpoint to determine total event count for each day
- Builds a list of URLs for each day with the appropriate `skip` parameter to paginate thru the results
- Consumes each URL to parse out the unique reactions called out in the drug/events
- Takes the list of unique reactions and sends a POST request to the DRE `/reaction` API resource with each reaction term


## Usage

```

node prepopulateDictionary.js [dre_hostname] [openFDA_api_key] [FROM_YYYY] [TO_YYYY] 

```

**[dre_hostname]**  = hostname of where **DRE** is loaded (ex. http://localhost:3000)

**[openFDA_api_key]**  = your openFDA api_key

**[FROM_YYYY]**  = from year `drug/events` where you would like to start 

**[TO_YYYY]**  = from year `drug/events` where you would like to end


## Caveats

- Since the script parses thru many OpenFDA endpoints, we recommend using a separate API key when running this than the one you are using on the DRE server

- Since this can be a long running script, we recommend starting walking backward year to year (2014, 2013, etc.) and just running it for one year at at time (set the FROM_YYYY and TO_YYYY to the same 4-digit year)

- At this time, the drug/events dataset only includes data from 2004 until 2014, so ranges outside of that will return no data







