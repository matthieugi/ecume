import os
from gremlin_python.driver import client, serializer

ACCOUNT_NAME = f"ecume-recommendation-engine"
ACCOUNT_KEY = f"0MgHggK1wewpKcs7InJAAmGyxXlfpV8K8Ka4U7hDd86FW9jnpfn2feLQBEloNwYzuz2YxpbRjypEACDbqqCp5Q=="


client = client.Client(
    url=f"wss://{ACCOUNT_NAME}.gremlin.cosmos.azure.com:443/",
    traversal_source="g",
    username="/dbs/ecume/colls/books",
    password=f"{ACCOUNT_KEY}",
    message_serializer=serializer.GraphSONSerializersV2d0(),
)

# client.submit("g.addV('place').property('id', 'London').property('country', 'France')")
# client.submit("g.addV('place').property('id', 'Maycomb, Alabama').property('country', 'France')")

# client.submit("g.addV('theme').property('id', 'Totalitarianism').property('country', 'France')")
# client.submit("g.addV('theme').property('id', 'Surveillance').property('country', 'France')")
# client.submit("g.addV('theme').property('id', 'Racial Injustice').property('country', 'France')")

# client.submit("g.addV('character').property('id', 'Winston Smith').property('country', 'France')")
# client.submit("g.addV('character').property('id', 'Big Brother').property('country', 'France')")
# client.submit("g.addV('character').property('id', 'Scout Finch').property('country', 'France')")
# client.submit("g.addV('character').property('id', 'Atticus Finch').property('country', 'France')")

# client.submit("g.addV('book').property('id', '1984').property('country', 'France')")
# client.submit("g.addV('book').property('id', 'To Kill a Mockingbird').property('country', 'France')")

# client.submit("g.V().has('book', 'id', '1984').addE('authored_by').to(g.V().has('author', 'id', 'George Orwell'))")
# client.submit("g.V().has('book', 'id', 'To Kill a Mockingbird').addE('authored_by').to(g.V().has('author', 'id', 'Harper Lee'))")

# client.submit("g.V().has('book', 'id', '1984').addE('set_in').to(g.V().has('place', 'id', 'London'))")
# client.submit("g.V().has('book', 'id', 'To Kill a Mockingbird').addE('set_in').to(g.V().has('place', 'id', 'Maycomb, Alabama'))")

# client.submit("g.V().has('book', 'id', '1984').addE('has_character').to(g.V().has('character', 'id', 'Winston Smith'))")
# client.submit("g.V().has('book', 'id', '1984').addE('has_character').to(g.V().has('character', 'id', 'Big Brother'))")
# client.submit("g.V().has('book', 'id', 'To Kill a Mockingbird').addE('has_character').to(g.V().has('character', 'id', 'Scout Finch'))")
# client.submit("g.V().has('book', 'id', 'To Kill a Mockingbird').addE('has_character').to(g.V().has('character', 'id', 'Atticus Finch'))")

# client.submit("g.V().has('book', 'id', '1984').addE('has_theme').to(g.V().has('theme', 'id', 'Totalitarianism'))")
# client.submit("g.V().has('book', 'id', '1984').addE('has_theme').to(g.V().has('theme', 'id', 'Surveillance'))")
# client.submit("g.V().has('book', 'id', 'To Kill a Mockingbird').addE('has_theme').to(g.V().has('theme', 'id', 'Racial Injustice'))")

# client.submit("g.addV('book').property('id', 'Animal Farm').property('country', 'France')")
# client.submit("g.V().has('book', 'id', 'Animal Farm').addE('authored_by').to(g.V().has('author', 'id', 'George Orwell'))")

# client.submit("g.addV('book').property('id', 'Go Set a Watchman').property('country', 'France')")
# client.submit("g.V().has('book', 'id', 'Go Set a Watchman').addE('authored_by').to(g.V().has('author', 'id', 'Harper Lee'))")

# client.submit("g.V().has('book', 'id', 'Animal Farm').addE('has_theme').to(g.V().has('theme', 'id', 'Totalitarianism'))")

# client.submit("g.addV('book').property('id', 'The Color Purple').property('country', 'France')")
# client.submit("g.V().has('book', 'id', 'The Color Purple').addE('has_theme').to(g.V().has('theme', 'id', 'Racial Injustice'))")

# client.submit("g.addV('book').property('id', 'Mrs Dalloway').property('country', 'France')")
# client.submit("g.V().has('book', 'id', 'Mrs Dalloway').addE('set_in').to(g.V().has('place', 'id', 'London'))")

# client.submit("g.addV('book').property('id', 'Fried Green Tomatoes at the Whistle Stop Cafe').property('country', 'France')")
# client.submit("g.V().has('book', 'id', 'Fried Green Tomatoes at the Whistle Stop Cafe').addE('set_in').to(g.V().has('place', 'id', 'Maycomb, Alabama'))")

# client.submit("g.addV('reader').property('id', 'reader1').property('country', 'France')")
# client.submit("g.addV('reader').property('id', 'reader2').property('country', 'France')")
# client.submit("g.addV('reader').property('id', 'reader3').property('country', 'France')")

# client.submit("g.V().has('reader', 'id', 'reader1').addE('read').to(g.V().has('book', 'id', '1984'))")
# client.submit("g.V().has('reader', 'id', 'reader1').addE('read').to(g.V().has('book', 'id', 'Animal Farm'))")
# client.submit("g.V().has('reader', 'id', 'reader2').addE('read').to(g.V().has('book', 'id', 'To Kill a Mockingbird'))")
# client.submit("g.V().has('reader', 'id', 'reader2').addE('read').to(g.V().has('book', 'id', 'Go Set a Watchman'))")
# client.submit("g.V().has('reader', 'id', 'reader3').addE('read').to(g.V().has('book', 'id', 'The Color Purple'))")
# client.submit("g.V().has('reader', 'id', 'reader3').addE('read').to(g.V().has('book', 'id', 'Mrs Dalloway'))")
client.submit("g.V().has('reader', 'id', 'reader2').addE('read').to(g.V().has('book', 'id', '1984'))")

#g.V().has('reader', 'id', 'reader1').as('himself').out('read').in('read').dedup().where(neq('himself')).out('read').values('id')
