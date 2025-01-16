import re

def get_lastname(name: str) -> str:
    """
    Get the last name from a given name string.

    Args:
        name (str): The full name string.

    Returns:
        str: The extracted last name.
    """
    # Get part that contains the last name
    part = re.split(r'\s*\(', name)[0].split(r'\s*,\s*')[0]
    # Split by space
    segments = re.split(r'\s+', part)
    # Get last index
    last = len(segments) - 1

    return segments[last - 1] if segments[last].startswith('(') else segments[last]


if __name__ == '__main__':
    print(get_lastname('Jane Bell'))
    print(get_lastname('Sowle, Jane'))
    print(get_lastname('James and John Astwood'))
