from fastapi import Header

def authorize_user(x_user_id: int = Header(), x_user_hashed_pass: str = Header()):
    return {
        'user_id': x_user_id,
        'username': f'user_{x_user_id}',
    }