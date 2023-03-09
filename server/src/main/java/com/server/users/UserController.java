package com.server.users;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository m_userRepository;

    @PostMapping("/registration")
    public void registerUser(@RequestBody User user) {
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        m_userRepository.save(user);
    }

    // TODO E - Login

    // TODO E - DELETE User

    // TODO E - Update User

    @PutMapping("/updateUserEmail")
    public void updateUserEmail(@RequestHeader("email") String email, @RequestBody UserNameAndPassword userNameAndPassword) {
        User user = m_userRepository.findByUserName(userNameAndPassword.getUserName()).orElseThrow(() -> new RuntimeException("User not found"));
        String hashedPassword = user.getPassword();
        if (!BCrypt.checkpw(userNameAndPassword.getPassword(), hashedPassword)) {
            throw new RuntimeException("Invalid credentials");
        }
        user.setEmail(email);
        m_userRepository.save(user);
    }

    @PutMapping("/updateUserPhoneNumber")
    public void updateUserPhoneNumber(@RequestHeader("phoneNumber") String phoneNumber, @RequestBody UserNameAndPassword userNameAndPassword) {
        User user = m_userRepository.findByUserName(userNameAndPassword.getUserName()).orElseThrow(() -> new RuntimeException("User not found"));
        String hashedPassword = user.getPassword();
        if (!BCrypt.checkpw(userNameAndPassword.getPassword(), hashedPassword)) {
            throw new RuntimeException("Invalid credentials");
        }
        user.setPhoneNumber(phoneNumber);
        m_userRepository.save(user);
    }

    /*@GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return m_userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return m_userRepository.findAll();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User user = m_userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        return m_userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        m_userRepository.deleteById(id);
    }*/
}

