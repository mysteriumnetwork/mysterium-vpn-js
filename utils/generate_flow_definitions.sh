#!/usr/bin/env bash
regexp="(.*).d.ts"

for ts_name in dist/{,**/}*.d.ts
do
    if ! [[ $ts_name =~ $regexp ]]
    then
        echo "Error, unable to parse filename $ts_name"
        exit 1
    fi

    # generate .js.flow file
    base_name="${BASH_REMATCH[1]}"
    flow_name=$base_name".js.flow"
    yarn flowgen $ts_name -o $flow_name

    # prepend @flow comment
    printf '%s\n%s\n' "// @flow" "$(cat $flow_name)" > $flow_name
done
