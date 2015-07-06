#[dre-reaction-dictionary-warmer]

## What is the for?
After a fresh install of the **DRE APIs**, the **reactions** dictionary is empty.  

While a client (such as the **DRE APP**) can send a POST to the `/reactions` endpoint for a given term to force the population of the dictionary, this script was built to help force the pre-loading of the reactions dictionary based upon the unique reactions we know are present in the [OpenFDA drug/events](https://open.fda.gov/drug/event/) dataset.

## How does it work and what are the requirements to run?

This is a stand alone node [node.js](https://nodejs.org/) CLI (command line interface) script and must be run from a machine that has node running, but does NOT necessarily have to be run from the server / container you have DRE running.

**The script goes thru the following steps:**

- Builds a list of query URLs for OpenFDA `drug/event` resources to fetch all events for each day between a provided date range
- Makes an initial call to the endpoint to determine total event count for each day
- Builds a list of URLs for each day with the appropriate `skip` parameter to paginate thru the results
- Consumes each URL to parse out the unique reactions called out in the drug/events
- Takes the list of unique reactions found for a given day and sends a POST request to the DRE `/reactions` API resource with each reaction term to force the Reaction Lookup API to populate the definition for each term  (if it isn't already in the lookup)


## Setup / Usage

### Script setup
- Clone the repo
- Change into the `./harvest` folder
- Run `npm install` to load the various node packages
- Run the following command:

### Running the script

```

node prepopulateDictionary.js [dre_reactions_uri] [openFDA_api_key] [FROM_YYYY] [TO_YYYY] 

```

**[dre\_reactions\_uri]**  = uri of where **DRE** reactions endpoint (example: `http://localhost:3000/api/reactions`)

**[openFDA\_api\_key]**  = your openFDA api_key

**[FROM_YYYY]**  = from year `drug/events` where you would like to start (example: `2013`)

**[TO_YYYY]**  = from year `drug/events` where you would like to end (example: `2014`)


## Caveats

- Since the script parses thru many OpenFDA endpoints, we recommend using a separate API key when running this than the one you are using on the DRE server

- Since this can be a long running script, we recommend starting walking backward year to year (2014, 2013, etc.) and just running it for one year at at time (set the FROM_YYYY and TO_YYYY to the same 4-digit year)

- At this time, the drug/events dataset only includes data from 2004 until 2014, so ranges outside of that will return no data

## Final Note

This script was designed to try to fetch all possible unique reactions for the provided time period.  

However, due to the 5000 skip limit imposed by the OpenFDA API (https://opendata.stackexchange.com/questions/5440/openfda-api-including-the-skip-parameter-limit) there are some cases where the total events for a given day are greater than 5000.  This will result in the script being able to fetch and reactions which are in events > 5000.  

But, this does not result in an issue with the DRE app because:

- There is a good chance the reaction is called out in another event and will be found at some point during the harvest / warming process

- The DRE APP / API is capable of fetching the reaction definitions at run-time in cases where the reaction has not been previously captured in the Reactions Lookup API







